const { version, bugs } = require('../package.json');

const { CANTEEN_URL } = require('./config');
const { getDay } = require('./utils');
const { CAFE_SECTION_TITLES } = require('./parser/options/main-menu');

const sentenceCase = line => {
  const trimmed = line
    .trim()
    .toLowerCase()
    .replace(/^['"]?[a-zA-z]/, substr => substr.toUpperCase());
  return trimmed;
};

const formatSubsection = (key, content) => `${sentenceCase(key)}: ${content}`;

// Format the menu content as a Slack web hook post payload.
const buildPayload = (date, { mainMenuContent, cafeMenuContent }) => {
  // For cafe, the section titles are days of the week.
  const day = getDay(date);
  const todaysCafeMenuContent = cafeMenuContent.find(x => x.title === day);

  // During certain periods of canteen closure, the main canteen section will contain the cafe menu.
  // If this occurs, we want to ignore the cafe content to avoid showing duplicate information.
  const mainMenuHasCafeMenu = mainMenuContent.some(({ title }) =>
    CAFE_SECTION_TITLES.includes(title),
  );

  const payloadContent = [
    ...mainMenuContent,
    todaysCafeMenuContent &&
      !mainMenuHasCafeMenu && {
        // Don't want the day as the title, so override it.
        ...todaysCafeMenuContent,
        title: 'Café',
      },
  ]
    .filter(Boolean)
    .map(section => {
      // For each section, we want to generate the lines of text.
      // First the main body content (if any), then each subsection text.
      const lines = [];
      if (section.body) {
        lines.push(...section.body);
      }
      lines.push(
        ...Object.keys(section.subsections).reduce((acc, key) => {
          acc.push(formatSubsection(key, section.subsections[key]));
          return acc;
        }, []),
      );

      // Each section output as a Slack attachment object (these will be sent as part of payload).
      return {
        title: section.title,
        color: section.color,
        text: lines.map(line => sentenceCase(line)).join('\n'),
        mrkdwn_in: ['text'],
      };
    });

  const payload = {
    username: 'Canteen on 14',
    icon_emoji: ':hamburger:',
    text: `Menu for ${date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`,
    attachments: [
      ...payloadContent,
      {
        text: [
          `Menu taken from <${CANTEEN_URL}#canteen|Canteen on 14 website>.`,
          `Menu Lambda ${version}. Any issues or suggestions? <${
            bugs.url
          }|Post on the GitHub!>`,
        ].join('\n'),
      },
    ],
  };
  return payload;
};

module.exports = { buildPayload };

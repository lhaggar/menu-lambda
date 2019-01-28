const got = require('got');

const { version, bugs } = require('../package.json');
const { SLACK_URL } = require('./config');
const { mainMenuParser, cafeMenuParser } = require('./parser');
const { sentenceCase, formatSubsection } = require('./formatter');

const canteenUrl = 'http://5438cpa251hgt.co.uk/';

// Util to get day word (i.e. cafe section name) from date.
const getDay = date => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  return days[date.getDay()];
};

// Get the json from the canteen website and run it through the parsers.
const getContent = async () => {
  const response = await got(`${canteenUrl}?format=json`, {
    json: true,
  });

  const { collections } = response.body.collection;

  const [mainMenuContent, cafeMenuContent] = [
    ['Canteen', mainMenuParser],
    ['Terrace Cafe', cafeMenuParser],
  ].map(([title, parser]) => {
    const collection = collections.find(x => x.title === title);
    return collection ? parser(collection.mainContent) : undefined;
  });

  return { mainMenuContent, cafeMenuContent };
};

// Format the menu content as a Slack web hook post payload.
const formatPayload = ({ mainMenuContent, cafeMenuContent }) => {
  const now = new Date();

  const payloadContent = [
    ...mainMenuContent,
    {
      // For cafe, the section names are days of the week, so we get todays one and rename the title.
      ...cafeMenuContent.find(x => x.title === getDay(now)),
      title: 'Café',
    },
  ].map(section => {
    // For each section, we want to generate the lines of text.
    // First the main body content (if any), then each subsection text.
    const lines = [];
    if (section.body) {
      lines.push(...section.body);
    }
    lines.push(
      ...Object.keys(section.subsections).reduce((acc, key, subsections) => {
        acc.push(formatSubsection(key, subsections));
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
    text: `Menu for ${now.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`,
    attachments: [
      ...payloadContent,
      {
        text: [
          `Menu taken from <${canteenUrl}#canteen|Canteen on 14 website>.`,
          `Menu Lambda ${version}. Any issues or suggestions? <${
            bugs.url
          }|Post on the GitHub!>`,
        ].join('\n'),
      },
    ],
  };
  return payload;
};

getContent()
  .then(content => formatPayload(content))
  .then(payload => {
    // eslint-disable-next-line no-console
    console.log('Posting payload:', JSON.stringify(payload, null, 2));
    return got(SLACK_URL, { method: 'POST', body: JSON.stringify(payload) });
  })
  // eslint-disable-next-line no-console
  .catch(err => console.log('Something went wrong!', err.stack || err));

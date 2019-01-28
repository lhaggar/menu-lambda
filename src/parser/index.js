const cheerio = require('cheerio');

const { sanitiseHtml, sanitiseLine } = require('./sanitiser');

const mainMenuOptions = require('./options/main-menu');
const cafeMenuOptions = require('./options/cafe-menu');

const push = (obj, key, data) => {
  if (!obj[key]) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = [data];
  } else {
    obj[key].push(data);
  }
};

const createParser = ({
  SECTIONS,
  IGNORE_LIST,
  END_SECTIONS_MATCHER,
  SUBSECTION_MATCHERS = [],
}) => {
  // Util for checking if text matches against an entry in the ignore list.
  const isIgnored = txt => IGNORE_LIST.some(matcher => matcher.test(txt));

  // Either create a section object based on the line being an expected title,
  // or return null (i.e. if a content line).
  const createSection = line => {
    const SECTION = SECTIONS.find(({ matcher }) => matcher.test(line));
    return SECTION
      ? { title: SECTION.displayName, subsections: {}, color: SECTION.color }
      : null;
  };

  // Take the html string and return an array of strings (the menu lines).
  const getContents = menuHtml => {
    const $ = cheerio.load(sanitiseHtml(menuHtml));
    const arr = [];
    $('*').each((i, element) => {
      // Go through each element, if it has no children (i.e. only text)...
      const el = $(element);
      if (!el.children().length) {
        // Get the text, trim it and make it lowercase.
        // If not empty and is not in ignore list then keep it.
        const txt = el.text().trim();
        if (txt !== '' && !isIgnored(txt)) {
          arr.push(txt);
        }
      }
    });

    // Look for our terminator section matcher, we exclude that line and everything after it.
    const finalIndex = END_SECTIONS_MATCHER
      ? arr.findIndex(txt => END_SECTIONS_MATCHER.test(txt))
      : undefined;
    return arr.slice(0, finalIndex);
  };

  const parse = menuHtml =>
    getContents(menuHtml).reduce((acc, line) => {
      const newSection = createSection(line);
      if (newSection) {
        // We've hit a section title so add the new section to the list.
        acc.push(newSection);
      } else {
        // We're not on a section title, so we're dealing with the section content.
        const currentSection = acc[acc.length - 1];
        // If we don't have a section then just ignore and continue.
        if (currentSection) {
          const subsection = SUBSECTION_MATCHERS.find(([matcher]) =>
            matcher.test(line),
          );
          if (subsection) {
            const [subsectionMatcher, subsectionName] = subsection;
            // Subsection line, strip the matcher and store.
            push(
              currentSection.subsections,
              subsectionName,
              sanitiseLine(line.replace(subsectionMatcher, '')),
            );
          } else {
            // Append the line to the current section body.
            push(currentSection, 'body', sanitiseLine(line));
          }
        }
      }
      return acc;
    }, []);

  return parse;
};

module.exports = {
  mainMenuParser: createParser(mainMenuOptions),
  cafeMenuParser: createParser(cafeMenuOptions),
};

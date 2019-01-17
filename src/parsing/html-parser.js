const cheerio = require('cheerio');

const { format } = require('./formatter');

// Titles which will form each object. Add titles to this as appropriate.
const SECTIONS = [
  {
    matcher: /FROM\s+THE\s+OVEN/i,
    displayName: 'From the Oven',
  },
  {
    matcher: /CHEFS\s+THEATRE/i,
    displayName: 'Chefs Theatre',
  },
  {
    matcher: /^\s*SOUP\s*$/i,
    displayName: 'Soup',
  },
  {
    matcher: /HEALTHY\s+BAR/i,
    displayName: 'Healthy Bar',
  },
];

// Any lines that match these will be excluded from the contents.
const IGNORE_LIST = [/CANTEEN\s+LUNCH/i, /^\s*OR\s*$/i];

// Anything after this matcher (including the matching line itself) will be trimmed from the end.
const END_SECTION_MATCHER = /CANTEEN\s+DINNER/i;

// Matcher to determine if a line is specifying sides or not.
const SIDES_MATCHER = /^\s*SIDES:/i;

// Util for checking if text matches against an entry in the ignore list.
const isIgnored = txt => IGNORE_LIST.some(matcher => matcher.test(txt));

// Either create a section object based on the line being an expected title,
// or return null (i.e. if a content line).
const createSection = line => {
  const SECTION = SECTIONS.find(({ matcher }) => matcher.test(line));
  return SECTION ? { title: SECTION.displayName, body: [], sides: [] } : null;
};

// Strip out tags which will break things - e.g. sides (see test fixtures).
const sanitiseHtml = menuHtml =>
  menuHtml.replace(/<(\/?)strong>|<(\/?)b>/g, '');

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
  const finalIndex = arr.findIndex(txt => END_SECTION_MATCHER.test(txt));
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
        if (SIDES_MATCHER.test(line)) {
          // Sides line, strip the matcher, split up and store.
          currentSection.sides.push(format(line.replace(SIDES_MATCHER, '')));
        } else {
          // Append the line to the current section body.
          currentSection.body.push(format(line));
        }
      }
    }
    return acc;
  }, []);

module.exports = {
  parse,
};

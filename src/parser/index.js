const cheerio = require('cheerio');

const { sanitiseHtml, sanitiseLine } = require('./sanitiser');
const { addSectionEffects } = require('./section-effects');
const { getSubsection, getElementText } = require('./utils');

const mainMenuOptions = require('./options/main-menu');
const cafeMenuOptions = require('./options/cafe-menu');

const push = (obj, key, data) => {
  if (!data) {
    return;
  }
  if (!obj[key]) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = [data];
  } else {
    obj[key].push(data);
  }
};

// Create a new section from existing one - this is when we have two meal options under one
// section heading, e.g. two choices "From the Oven" with their own respective sides e.t.c.
const duplicateSection = ({ title, color }) => ({
  title,
  subsections: {},
  color,
});

const createParser = ({
  PREPROCESS_SECTIONS,
  SECTIONS,
  IGNORE_LIST,
  END_SECTIONS_MATCHERS,
  SUBSECTION_MATCHERS = [],
}) => {
  // Util for checking if text matches against an entry in the ignore list.
  const isIgnored = txt =>
    IGNORE_LIST.some(matcher => matcher && matcher.test(txt));

  // Either create a section object based on the line being an expected title,
  // or return null (i.e. if a content line).
  const createSection = (line, firstLine) => {
    const SECTION = SECTIONS.find(
      ({ matcher }) => matcher && matcher.test(line),
    );
    if (SECTION) {
      return {
        title: SECTION.displayName,
        subsections: {},
        color: SECTION.color,
      };
    }
    const unnamedSection = SECTIONS.find(x => !x.matcher);
    if (firstLine && unnamedSection) {
      // First title has no section header!
      return {
        title: unnamedSection.displayName,
        body: [line],
        subsections: {},
        color: unnamedSection.color,
      };
    }
    return null;
  };

  // Take the html string and return an array of strings (the menu lines).
  const getContents = menuHtml => {
    const $ = cheerio.load(sanitiseHtml(menuHtml));
    const arr = [];
    const elements = $('*');
    elements.each((i, element) => {
      if (element.skip) {
        return;
      }
      // Go through each element, if it has no children (i.e. only text)...
      const txt = getElementText($, element);
      // If not empty and is not in ignore list then keep it.
      if (txt && !isIgnored(txt)) {
        // Pre-process sections (split sections which are one-liners)
        const preprocess = PREPROCESS_SECTIONS.find(({ matcher }) =>
          matcher.test(txt),
        );
        if (preprocess) {
          if (preprocess.splitOn) {
            arr.push(...txt.split(preprocess.splitOn));
          } else if (preprocess.customBehaviour) {
            preprocess.customBehaviour({
              i,
              arr,
              $,
              elements,
              line: txt,
            });
          }
        } else {
          arr.push(txt);
        }
      }
    });

    // Look for our terminator section matcher, we exclude that line and everything after it.
    const finalIndex = END_SECTIONS_MATCHERS
      ? arr.findIndex(txt =>
          END_SECTIONS_MATCHERS.some(matcher => matcher && matcher.test(txt)),
        )
      : undefined;

    return finalIndex === -1 ? arr : arr.slice(0, finalIndex);
  };

  const parse = menuHtml =>
    getContents(menuHtml)
      .reduce((acc, line, i, lines) => {
        const newSection = createSection(line, i === 0);
        const lineIsAnOrBreak = line.toLowerCase() === 'or';
        let currentSection = acc[acc.length - 1];

        if (newSection) {
          // We've hit a section title so add the new section to the list.
          acc.push(newSection);
        } else {
          if (
            currentSection &&
            getSubsection(SUBSECTION_MATCHERS, lines[i - 1]) &&
            !getSubsection(SUBSECTION_MATCHERS, line)
          ) {
            // We have a current section, previous line was a subsection, and current line isn't a subsection.
            // Means we've hit a duplicate section, so reassign currentSection.
            // (i.e. prev line is "SIDES: xyz" and a new section was not created; two "From the Oven" options for example).
            currentSection = duplicateSection(currentSection);
            acc.push(currentSection);
          }

          if (currentSection && !lineIsAnOrBreak) {
            // We're not on a section title, so we're dealing with the section content.
            // If we don't have a section then just ignore and continue.
            const subsection = getSubsection(SUBSECTION_MATCHERS, line);
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
      }, [])
      .map(addSectionEffects)
      .filter(
        section =>
          section &&
          ((section.body && section.body.length) ||
            Object.keys(section.subsections).length),
      );

  return parse;
};

module.exports = {
  mainMenuParser: createParser(mainMenuOptions),
  cafeMenuParser: createParser(cafeMenuOptions),
};

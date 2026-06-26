const getSection = (SECTIONS, line) =>
  SECTIONS.find(({ matcher }) => matcher && matcher.test(line));

const getSubsection = (SUBSECTION_MATCHERS, line) =>
  SUBSECTION_MATCHERS.find(([matcher]) => matcher.test(line));

const getElementText = ($, element) => {
  const el = $(element);
  if (!el.children().length) {
    return el.text().trim();
  }
  return null;
};

module.exports = {
  getSection,
  getSubsection,
  getElementText,
};

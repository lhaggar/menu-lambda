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
  getSubsection,
  getElementText,
};

const getSubsection = (SUBSECTION_MATCHERS, line) =>
  SUBSECTION_MATCHERS.find(([matcher]) => matcher.test(line));

module.exports = {
  getSubsection,
};

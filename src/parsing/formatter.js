// Formatters are run through in order on each line, [0] is search, [1] is replace value.
const FORMATTERS = [
  // Remove excess spaces around commas
  [/\s+,\s+/g, ', '],
  // Remove the word OR from the end of lines
  [/\s+OR\s*$/gi, ''],
  // Remove excess spaces
  [/\s{2,}/gi, ' '],
];

const format = txt => {
  const trimmed = FORMATTERS.reduce(
    (acc, [searchValue, replaceValue]) =>
      acc.replace(searchValue, replaceValue),
    txt.trim(),
  );
  return `${trimmed[0].toUpperCase()}${trimmed.slice(1).toLowerCase()}`;
};

module.exports = { format };

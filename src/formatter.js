const sentenceCase = line => {
  const trimmed = line.trim();
  return `${trimmed[0].toUpperCase()}${trimmed.slice(1).toLowerCase()}`;
};

const formatSubsection = (key, content) => `${sentenceCase(key)}: ${content}`;

module.exports = { sentenceCase, formatSubsection };

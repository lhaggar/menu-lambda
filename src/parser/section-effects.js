const applyTitleEmojis = (before = '', after = '') => section => ({
  ...section,
  title: [before, section.title, after].filter(Boolean).join(' '),
});

const flattenSubsections = section =>
  `${section.body && section.body.join(' ')} ${Object.entries(
    section.subsections || {},
  )
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join(' ')}`;

// Effects stack (i.e. more than one can apply) in the order of the array.
const effectsMap = [
  {
    matcher: /\b(christmas|xmas)\b/i,
    applyEffect: applyTitleEmojis('🎄', '🎅🏼'),
  },
  // {
  //   matcher: /\bpizza\b/i,
  //   applyEffect: applyTitleEmojis('', '🍕'),
  // },
  // {
  //   matcher: /\bpancakes\b/i,
  //   applyEffect: applyTitleEmojis('', '🥞'),
  // },
];

const addSectionEffects = section => {
  // Flatten all body text, subsection keys and values into a single string for searching.
  const text = flattenSubsections(section);
  return effectsMap.reduce((acc, { matcher, applyEffect }) => {
    // Apply each matched effect
    if (matcher.test(text)) {
      return applyEffect(acc);
    }
    return acc;
  }, section);
};

module.exports = {
  addSectionEffects,
};

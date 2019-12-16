const applyTitleEmojis = (before = '', after = '') => section => ({
  ...section,
  title: `${before} ${section.title} ${after}`,
});

const flattenSubsections = section =>
  `${section.body && section.body.join(' ')} ${Object.values(
    section.subsections || {},
  )
    .map(subsection => subsection.join(' '))
    .join(' ')}`;

const effectsMap = [
  {
    matcher: /\b(christmas|xmas)\b/gi,
    applyEffect: applyTitleEmojis('🎄', '🎅🏼'),
  },
];

const addSeasonalEffects = section => {
  const text = flattenSubsections(section);
  const fx = effectsMap.find(effect => effect.matcher.test(text));
  return fx ? fx.applyEffect(section) : section;
};

module.exports = {
  addSeasonalEffects,
};

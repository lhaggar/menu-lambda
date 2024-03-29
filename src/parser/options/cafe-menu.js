const CAFE_COLOUR = '#3126A2';

module.exports = {
  CAFE_COLOUR,
  // These matchers will trigger a split of the line by the splitOn string,
  // used where section title and content is on one line
  PREPROCESS_SECTIONS: [],
  // Titles which will form each object. Add titles to this as appropriate.
  SECTIONS: [
    {
      matcher: /^\s*monday\s*$/i,
      displayName: 'monday',
    },
    {
      matcher: /^\s*tuesday\s*$/i,
      displayName: 'tuesday',
    },
    {
      matcher: /^\s*wednesday\s*$/i,
      displayName: 'wednesday',
    },
    {
      matcher: /^\s*thursday\s*$/i,
      displayName: 'thursday',
    },
    {
      matcher: /^\s*friday\s*$/i,
      displayName: 'friday',
    },
  ].map(x => ({ ...x, color: CAFE_COLOUR })),

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/^SOUP:.+/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTIONS_MATCHERS: null,

  // Matchers to determine if a line is specifying a subsection, e.g. sides, and the name of the subsection.
  SUBSECTION_MATCHERS: [],
};

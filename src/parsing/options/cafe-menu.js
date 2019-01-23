module.exports = {
  // Titles which will form each object. Add titles to this as appropriate.
  SECTIONS: [
    {
      matcher: /monday/i,
      displayName: 'monday',
    },
    {
      matcher: /tuesday/i,
      displayName: 'tuesday',
    },
    {
      matcher: /wednesday/i,
      displayName: 'wednesday',
    },
    {
      matcher: /thursday/i,
      displayName: 'thursday',
    },
    {
      matcher: /friday/i,
      displayName: 'friday',
    },
  ],

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/^SOUP:.+/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTIONS_MATCHER: null,

  // Matchers to determine if a line is specifying a subsection, e.g. sides, and the name of the subsection.
  SUBSECTION_MATCHERS: [
    [/^\s*breakfast:/i, 'breakfast'],
    [/^\s*lunch:/i, 'lunch'],
  ],
};

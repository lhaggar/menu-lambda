module.exports = {
  // Titles which will form each object. Add titles to this as appropriate.
  SECTIONS: [
    {
      matcher: /FROM\s+THE\s+OVEN/i,
      displayName: 'From the Oven',
    },
    {
      matcher: /CHEFS\s+THEATRE/i,
      displayName: 'Chefs Theatre',
    },
    {
      matcher: /^\s*SOUP\s*$/i,
      displayName: 'Soup',
    },
    {
      matcher: /HEALTHY\s+BAR/i,
      displayName: 'Healthy Bar',
    },
  ],

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/CANTEEN\s+LUNCH/i, /^\s*OR\s*$/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTION_MATCHER: /CANTEEN\s+DINNER/i,

  // Matcher to determine if a line is specifying sides or not.
  SIDES_MATCHER: /^\s*SIDES:/i,
};

const { CAFE_COLOUR } = require('./cafe-menu');

module.exports = {
  // Titles which will form each object. Add titles to this as appropriate.
  SECTIONS: [
    {
      matcher: /^\s*FROM\s+THE\s+OVEN\s*$/i,
      displayName: 'From the Oven',
      color: '#C41017',
    },
    {
      matcher: /^\s*CHEF(\\u2019|\\u2018|\\u201B|\\u2032|'|’|`|‘)?S\s+THEATRE\s*$/i,
      displayName: 'Chefs Theatre',
      color: '#00BFFF',
    },
    {
      matcher: /^\s*THEATRE\s+BAR\s*$/i,
      displayName: 'Theatre Bar',
      color: '#9933FF',
    },
    {
      matcher: /^\s*THEATRE\s+STATION\s*$/i,
      displayName: 'Theatre Station',
      color: '#3360ff',
    },
    {
      matcher: /^\s*SOUP\s*$/i,
      displayName: 'Soup',
      color: '#e6e600',
    },
    {
      matcher: /^\s*HEALTHY\s+BAR\s*$/i,
      displayName: 'Healthy Bar',
      color: '#007404',
    },
    {
      matcher: /^\s*Healthy\s+Station\s*$/i,
      displayName: 'Healthy Station',
      color: '#007404',
    },
    {
      matcher: /^\s*Vegetarian\s+(Station|Counter)\s*$/i,
      displayName: 'Vegetarian Station',
      color: '#008575',
    },
    {
      matcher: /^\s*Vegan\s+(Station|Counter)\s*$/i,
      displayName: 'Vegan Station',
      color: '#008575',
    },
    {
      // On a bank holiday the cafe appeared as a main canteen section...
      matcher: /^\s*Terrace\s+Caf[eé]\s*$/i,
      displayName: 'Terrace Cafe',
      color: CAFE_COLOUR,
    },
    {
      matcher: false,
      displayName: 'No name 😔',
      color: '#CCCCCC',
    },
  ],

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/CANTEEN\s+LUNCH/i, /daily\s+canteen\s+menu/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTIONS_MATCHERS: [/CANTEEN\s+DINNER/i, /terrace\s+caf[eé]\s+dinner/i],

  // Matchers to determine if a line is specifying a subsection, e.g. sides, and the name of the subsection.
  SUBSECTION_MATCHERS: [
    [/^\s*SIDE(S)?:/i, 'sides'],
    [/^\s*add\s+on:/i, 'add on'],
    [/^\s*EXTRA(S)?:/i, 'extras'],
    [/^Made to order pizza bar:/i, 'made to order pizza bar'],
  ],
};

const { CAFE_COLOUR } = require('./cafe-menu');

const cafeSections = [
  {
    // During coronavirus closure, cafe breakfast appeared as a main canteen section.
    matcher: /^\s*Terrace\s+Caf[eé]\s+Breakfast/i,
    displayName: 'Terrace Café Breakfast',
    color: '#ffbf00',
  },
  {
    // During coronavirus closure, cafe lunch appeared as a main canteen section.
    matcher: /^\s*Terrace\s+Caf[eé]\s+Lunch/i,
    displayName: 'Terrace Café Lunch',
    color: CAFE_COLOUR,
  },
  {
    // On a bank holiday the cafe appeared as a main canteen section.
    matcher: /^\s*Terrace\s+Caf[eé]\s*$/i,
    displayName: 'Terrace Café',
    color: CAFE_COLOUR,
  },
];

module.exports = {
  // These matchers will trigger a split of the line by the splitOn string,
  // used where section title and content is on one line
  PREPROCESS_SECTIONS: [
    {
      matcher: /^\s*Soup:\s*/i,
      splitOn: ':',
    },
    {
      matcher: /^\s*Hot\s*snack:\s*/i,
      splitOn: ':',
    },
    {
      matcher: /^\s*Selection\s*of\s*salads,\s*sandwiches,\s*baguettes\s*and\s*wraps\s*/i,
      customBehaviour: ({ line, arr }) => {
        arr.push('sandwiches and salads');
        arr.push(line);
      },
    },
  ],

  // Titles which will form each object. Add titles to this as appropriate.
  SECTIONS: [
    {
      matcher: /^\s*FROM\s+THE\s+OVEN\s*$/i,
      displayName: 'From the Oven',
      color: '#C41017',
    },
    {
      matcher: /^\s*HOT\s+SNACK\s*$/i,
      displayName: 'Hot Snack',
      color: '#990099',
    },
    {
      matcher: /^\s*CHEF(\\u2019|\\u2018|\\u201B|\\u2032|'|’|`|‘)?S\s+THEATRE\s*$/i,
      displayName: 'Chefs Theatre',
      color: '#00BFFF',
    },
    {
      matcher: /^\s*Street\s+Food\s*$/i,
      displayName: 'Street Food',
      color: '#00BFFF',
    },
    {
      matcher: /^\s*THEATRE\s+BAR\s*$/i,
      displayName: 'Theatre Bar',
      color: '#3360ff',
    },
    {
      matcher: /^\s*THEATRE(\s+(STATION|COUNTER))?\s*$/i,
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
      color: '#2f8500',
    },
    {
      matcher: /^\s*HEALTHY(\s+(STATION|COUNTER))?\s*$/i,
      displayName: 'Healthy Station',
      color: '#2f8500',
    },
    {
      matcher: /^\s*VEGETARIAN(\s+(STATION|COUNTER))?\s*$/i,
      displayName: 'Vegetarian Station',
      color: '#008575',
    },
    {
      matcher: /^\s*VEGAN\s+(STATION|COUNTER)\s*$/i,
      displayName: 'Vegan Station',
      color: '#008554',
    },
    {
      matcher: /^\s*SANDWICHES\s+AND\s+SALADS\s*/i,
      displayName: 'Sandwiches and Salads',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*BREAKFAST\s+SPECIAL:?\s*$/i,
      displayName: 'Breakfast Special',
      color: '#ffbf00',
    },
    {
      matcher: /^\s*BREAKFAST:?\s*$/i,
      displayName: 'Breakfast',
      color: '#ffbf00',
    },
    {
      matcher: /^\s*LUNCH(\s+MENU)?\s*$/i,
      displayName: 'Lunch',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*DINNER(\s+MENU)?\s*/i,
      displayName: 'Dinner',
      color: '#9933FF',
    },
    {
      matcher: /^\s*DESSERT:?\s*$/i,
      displayName: 'Dessert',
      color: '#cc3399',
    },

    // Coronavirus lockdown options!
    {
      matcher: /^\s*LUNCH\s+(SANDWICH|SANDWICHES)\s+SELECTION\s*/i,
      displayName: 'Lunch - Sandwich Selection',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*PRET\s+(SANDWICH|SANDWICHES)\s*/i,
      displayName: 'Lunch - Pret Sandwiches',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*PRET\s+SALAD(\s+BOXES)?\s*/i,
      displayName: 'Lunch - Pret Salad Boxes',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*(LUNCH\s+)?(SANDWICH|SANDWICHES)\s+(&|AND)\s+SALAD\s+SELECTION(\s+:)?\s*/i,
      displayName: 'Lunch - Sandwich & Salad Selection',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*(LUNCH\s+)?PRET\s+(SANDWICH|SANDWICHES)\s+(&|AND)\s+SALAD\s+SELECTION\s*/i,
      displayName: 'Lunch - Pret Sandwich & Salad Selection',
      color: '#19b7b4',
    },
    {
      matcher: /^\s*PRET\s+(SNACKS)\s*/i,
      displayName: 'Lunch - Pret Snacks',
      color: '#19b7b4',
    },

    // These are separate so duplications can be filtered out of Cafe menu
    ...cafeSections,
    {
      matcher: false,
      displayName: '',
      color: '#CCCCCC',
    },
  ],

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/CANTEEN\s+LUNCH/i, /daily\s+canteen\s+menu/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTIONS_MATCHERS: [
    /CANTEEN\s+DINNER/i,
    /DINNER/i,
    /terrace\s+caf[eé]\s+dinner/i,
  ],

  // Matchers to determine if a line is specifying a subsection, e.g. sides, and the name of the subsection.
  SUBSECTION_MATCHERS: [
    [/^\s*SIDE(S)?:/i, 'sides'],
    [/^\s*add\s+on:/i, 'add on'],
    [/^\s*EXTRA(S)?:/i, 'extras'],
    [/^Made to order pizza bar:/i, 'made to order pizza bar'],
  ],

  CAFE_SECTION_TITLES: cafeSections.map(({ displayName }) => displayName),
};

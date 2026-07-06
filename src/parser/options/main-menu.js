const { CAFE_COLOUR } = require('./cafe-menu');
const { getElementText, getSection } = require('../utils');

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

const MAINS_SECTION = {
  matcher: /^Mains$/i,
  displayName: 'Mains',
  color: '#C41017',
};

const titleCaseMatchedTitle = line =>
  line
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*:$/, '')
    .toLowerCase()
    .replace(
      /(^|[\s/])([a-z])/g,
      (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`,
    );

const dynamicTitleSection = (matcher, displayName, color) => ({
  matcher,
  // Parser prefers formatTitle(line); displayName remains fallback/label metadata.
  displayName,
  formatTitle: titleCaseMatchedTitle,
  color,
});

// Titles which will form each object. Add titles to this as appropriate.
const SECTIONS = [
  {
    matcher: /^\s*FROM\s+THE\s+OVEN\s*$/i,
    displayName: 'From the Oven',
    color: '#C41017',
  },
  MAINS_SECTION,
  {
    matcher: /^\s*HOT\s+SNACK\s*$/i,
    displayName: 'Hot Snack',
    color: '#990099',
  },
  {
    matcher: /^\s*CHEF(\\u2019|\\u2018|\\u201B|\\u2032|'|’|`|‘)?S\s+THEATRE\s*$/i,
    displayName: "Chef's Theatre",
    color: '#00BFFF',
  },
  dynamicTitleSection(
    /^\s*Street\s+Food(?:\s+(?:Pop-up|Pop\s+up))?\s*$/i,
    'Street Food',
    '#00BFFF',
  ),
  dynamicTitleSection(
    /^\s*THEATRE(?:\s+(?:BAR|STATION|COUNTER))?\s*$/i,
    'Theatre Station',
    '#3360ff',
  ),
  dynamicTitleSection(
    /^\s*(?:Genuine\s+)?Chip\s+Shop\s*$/i,
    'Chip Shop',
    '#2F80C1',
  ),
  dynamicTitleSection(/^\s*TANDOORI\s+GRILL\s*$/i, 'Tandoori Grill', '#7E57C2'),
  dynamicTitleSection(
    /^\s*TANABATA\s+JAPANESE\s+SUMMER\s+FESTIVAL\s*$/i,
    'Tanabata Japanese Summer Festival',
    '#C2185B',
  ),
  dynamicTitleSection(
    /^\s*P[EI]RI\s+P[EI]RI(?:\s+[A-Z]+)?\s*$/i,
    'Piri Piri',
    '#F57C00',
  ),
  dynamicTitleSection(
    /^\s*BIG\s+BOY\s+BURRITO\s*$/i,
    'Big Boy Burrito',
    '#795548',
  ),
  dynamicTitleSection(
    /^\s*(?:(?:street[-\s]+style|[a-z]+)\s+)?gyros\s*$/i,
    'Gyros',
    '#008C95',
  ),
  {
    matcher: /^\s*KFTB\s*$/i,
    displayName: 'KFTB',
    color: '#26A69A',
  },
  dynamicTitleSection(
    /^\s*BRUSCHETTA\s+ON\s+14\s*$/i,
    'Bruschetta On 14',
    '#8E7CC3',
  ),
  {
    matcher: /^\s*PIZZA\s+ON\s+14\s*$/i,
    displayName: 'Pizza on 14',
    color: '#D94F1F',
  },
  dynamicTitleSection(
    /^\s*(chef(?:'|’)?s\s+)?(live\s+)?pasta\s+bar\s*$/i,
    'Pasta Bar',
    '#c7990f',
  ),
  {
    matcher: /^\s*SOUP\s*$/i,
    displayName: 'Soup',
    color: '#e6e600',
  },
  dynamicTitleSection(
    /^\s*HEALTHY(?:\s+(?:BAR|STATION|COUNTER))?\s*$/i,
    'Healthy Station',
    '#2f8500',
  ),
  dynamicTitleSection(/^\s*LEBANESE\s+SALAD\s*$/i, 'Lebanese Salad', '#43A047'),
  dynamicTitleSection(
    /^\s*(?:(?:[a-z0-9&'’.-]+\s+){0,4}C(?:AE|EA)S[AE]R\s+SALAD(?:\s+BAR)?|SALAD\s+BAR\s+(?:[a-z0-9&'’.-]+\s+){0,4}C(?:AE|EA)S[AE]R)\s*$/i,
    'Caesar Salad',
    '#558B2F',
  ),
  dynamicTitleSection(
    /^\s*(?:(?:THE|GENUINE)\s+)?SALAD\s+BAR\s*$/i,
    'The Salad Bar',
    '#2f8500',
  ),
  dynamicTitleSection(
    /^\s*WARM\s+CAULIFLOWER\s+CAESAR\s*$/i,
    'Warm Cauliflower Caesar',
    '#607D8B',
  ),
  dynamicTitleSection(
    /^\s*ASIAN(?:\s+STYLE)?\s+NOODLE\s+SALAD\s*$/i,
    'Asian Style Noodle Salad',
    '#009688',
  ),
  dynamicTitleSection(
    /^\s*VEGETARIAN(?:\s+(?:STATION|COUNTER|DELIGHT))?\s*$/i,
    'Vegetarian Station',
    '#008575',
  ),
  dynamicTitleSection(
    /^\s*VEGANUARY(?:\s+(?:STATION|COUNTER))?\s*$/i,
    'Veganuary',
    '#008554',
  ),
  dynamicTitleSection(
    /^\s*VEGAN\s+(?:STATION|COUNTER)\s*$/i,
    'Vegan Station',
    '#008554',
  ),
  dynamicTitleSection(
    /^\s*(?:[a-z0-9&'’.-]+\s+){0,4}(?:SHEPHERD(?:'|’)?S?|SHEPHERDESS)\s+PIE\s*$/i,
    "Shepherd's Pie",
    '#5C6BC0',
  ),
  dynamicTitleSection(
    /^\s*[a-z0-9&'’.-][a-z0-9&'’.\-\s]*BURGERS?\s*$/i,
    'Burger',
    '#6C8EBF',
  ),
  {
    matcher: /^\s*SANDWICHES\s+AND\s+SALADS\s*/i,
    displayName: 'Sandwiches and Salads',
    color: '#19b7b4',
  },
  dynamicTitleSection(
    /^\s*BREAKFAST(?:\s+SPECIAL)?\s*:?\s*$/i,
    'Breakfast',
    '#ffbf00',
  ),
  {
    matcher: /^\s*LUNCH(\s+MENU)?(\s*:)?\s*$/i,
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
];

module.exports = {
  // These matchers will trigger a split of the line by the splitOn string,
  // used where section title and content is on one line
  PREPROCESS_SECTIONS: [
    {
      matcher: /^\s*Soup:\s*/i,
      customBehaviour: ({ line, arr, i, $, elements }) => {
        // Split Soup to own line for section matcher later.
        arr.push(...line.split(':'));

        const nextElement = elements[i + 1];
        if (!nextElement) {
          return;
        }

        const nextLine = getElementText($, nextElement);
        if (nextLine && nextLine.startsWith('£')) {
          nextElement.skip = true;
          arr.push(nextLine);
        }

        const nextElementPlus1 = elements[i + 2];
        const nextLinePlus1 =
          nextElementPlus1 && getElementText($, nextElementPlus1);
        if (!getSection(SECTIONS, nextLinePlus1)) {
          arr.push('Mains');
        }
      },
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
    {
      matcher: /^\s*Add on:\s*/i,
      customBehaviour: ({ line, arr, i, $, elements }) => {
        if (elements.length <= i) {
          return;
        }
        const nextElement = elements[i + 1];
        const nextLine = getElementText($, nextElement);
        if (nextLine && nextLine.startsWith('£')) {
          nextElement.skip = true;
          arr.push(`${line} (${nextLine})`);
        } else {
          arr.push(line);
        }
      },
    },
  ],

  SECTIONS,

  FALLBACK_SECTION: MAINS_SECTION,

  // Any lines that match these will be excluded from the contents.
  IGNORE_LIST: [/CANTEEN\s+LUNCH/i, /daily\s+canteen\s+menu/i, /^Mains$/i],

  // Anything after this matcher (including the matching line itself) will be trimmed from the end.
  END_SECTIONS_MATCHERS: [
    /CANTEEN\s+DINNER/i,
    /18:00\s+-\s+20:00/i,
    /^\s*DINNER\s*$/i,
    /terrace\s+caf[eé]\s+dinner/i,
    /DINNER\s+MENU/,
  ],

  // Matchers to determine if a line is specifying a subsection, e.g. sides, and the name of the subsection.
  SUBSECTION_MATCHERS: [
    [/^\s*SIDE(S)?\s*:/i, 'Sides: '],
    [/^\s*add\s+on(s)?\s*:/i, 'Add on: '],
    [/^\s*EXTRA(S)?\s*:/i, 'Extras: '],
    [/^\s*Made\s+to\s+order\s+pizza\s+bar\s*:/i, 'Made to order pizza bar: '],
    [/^\s*£/, '£'], // If we have a price on a new line it's end of that item and we need to trigger a section duplication
  ],

  CAFE_SECTION_TITLES: cafeSections.map(({ displayName }) => displayName),
};

const got = require('got');
const url = require('url');

const { CANTEEN_URL } = require('./config');
const { mainMenuParser, cafeMenuParser } = require('./parser');
const { getDay } = require('./utils');

const get = u => got(`${u}?format=json`, { json: true });

// Get the json from the canteen website and run it through the parsers.
const getContent = async (date, parse = true) => {
  const day = getDay(date);
  const [mainMenuContent, cafeMenuContent] = await Promise.all([
    get(url.resolve(CANTEEN_URL, `/canteen-${day}`)).then(
      ({ body: { mainContent } }) =>
        parse ? mainMenuParser(mainContent) : mainContent,
    ),
    get(CANTEEN_URL).then(res => {
      const collection = res.body.collection.collections.find(
        x => x.title === 'Terrace Cafe',
      );
      if (!collection) {
        return undefined;
      }
      return parse
        ? cafeMenuParser(collection.mainContent)
        : collection.mainContent;
    }),
  ]);

  return { mainMenuContent, cafeMenuContent };
};

module.exports = { getContent };

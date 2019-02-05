const got = require('got');

const { CANTEEN_URL } = require('./config');
const { mainMenuParser, cafeMenuParser } = require('./parser');

// Get the json from the canteen website and run it through the parsers.
const getContent = async () => {
  const response = await got(`${CANTEEN_URL}?format=json`, {
    json: true,
  });

  const { collections } = response.body.collection;

  const [mainMenuContent, cafeMenuContent] = [
    ['Canteen', mainMenuParser],
    ['Terrace Cafe', cafeMenuParser],
  ].map(([title, parser]) => {
    const collection = collections.find(x => x.title === title);
    return collection ? parser(collection.mainContent) : undefined;
  });

  return { mainMenuContent, cafeMenuContent };
};

module.exports = { getContent };

const menuFixtures = require('../../fixtures/main-menu');
const cafeMenuFixtures = require('../../fixtures/cafe-menu');

const { mainMenuParser, cafeMenuParser } = require('.');

describe('parser/index.js', () => {
  describe('mainMenuParser', () => {
    menuFixtures.forEach(fixture => {
      it('should parse the html snippet', () => {
        const actual = mainMenuParser(fixture);

        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('cafeMenuParser', () => {
    cafeMenuFixtures.forEach(fixture => {
      it('should parse the html snippet', () => {
        const actual = cafeMenuParser(fixture);

        expect(actual).toMatchSnapshot();
      });
    });
  });
});

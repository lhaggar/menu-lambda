const menuFixtures = require('../../fixtures/main-menu');
const menuSnapshots = require('../../snapshots/main-menu');
const cafeMenuFixtures = require('../../fixtures/cafe-menu');
const cafeMenuSnapshots = require('../../snapshots/cafe-menu');
const { assertFixtures } = require('../../test-utils/assert-fixtures');

const { mainMenuParser, cafeMenuParser } = require('./html-parser');

describe('html-parser.js', () => {
  describe('mainMenuParser', () => {
    assertFixtures(menuFixtures, menuSnapshots);

    menuFixtures.forEach((fixture, i) => {
      const snapshot = menuSnapshots[i];

      it('should parse the html snippet', () => {
        expect(mainMenuParser(fixture)).toEqual(snapshot);
      });
    });
  });

  describe('cafeMenuParser', () => {
    assertFixtures(cafeMenuFixtures, cafeMenuSnapshots);

    cafeMenuFixtures.forEach((fixture, i) => {
      const snapshot = cafeMenuSnapshots[i];

      it('should parse the html snippet', () => {
        expect(cafeMenuParser(fixture)).toEqual(snapshot);
      });
    });
  });
});

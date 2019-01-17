const fixtures = require('../../fixtures/menu');
const snapshots = require('../../snapshots/menu');
const { assertFixtures } = require('../../test-utils/assert-fixtures');

const { parse } = require('./html-parser');

describe('html-parser.js', () => {
  assertFixtures(fixtures, snapshots);

  fixtures.forEach((fixture, i) => {
    const snapshot = snapshots[i];

    it('should parse the html snippet', () => {
      expect(parse(fixture)).toEqual(snapshot);
    });
  });
});

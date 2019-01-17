const fixtures = require('../fixtures/menu');
const snapshots = require('../snapshots/menu');

const { parse } = require('./html-parser');

describe('html-parser.js', () => {
  it('should have test fixtures', () => {
    expect(fixtures).not.toHaveLength(0);
  });

  fixtures.forEach((fixture, i) => {
    const snapshot = snapshots[i];

    it('should parse the html snippet', () => {
      expect(parse(fixture)).toEqual(snapshot);
    });
  });
});

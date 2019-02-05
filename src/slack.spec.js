const fixture = require('../fixtures/parsed-menu-content');

describe('src/slack.js', () => {
  describe('buildPayload', () => {
    let data;
    let mocks;
    let result;

    beforeAll(() => {
      data = {
        date: new Date('2019-02-01'),
        menuContent: fixture,
        pkgVersion: '1.33.7',
        pkgBugsUrl: 'https://the-bugs-url.com',
        canteenUrl: 'https://the-canteen-url.com',
      };

      mocks = {
        getDay: jest.fn(() => 'monday'),
      };

      jest.doMock('../package.json', () => ({
        version: data.pkgVersion,
        bugs: {
          url: data.pkgBugsUrl,
        },
      }));

      jest.doMock('./config', () => ({
        CANTEEN_URL: data.canteenUrl,
      }));

      jest.doMock('./utils', () => ({
        getDay: mocks.getDay,
      }));

      // eslint-disable-next-line global-require
      const { buildPayload } = require.requireActual('./slack');
      result = buildPayload(data.date, data.menuContent);
    });

    it('should return a snapshot match', () => {
      expect(result).toMatchSnapshot();
    });
  });
});

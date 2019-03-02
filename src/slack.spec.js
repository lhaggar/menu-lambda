const fixture = require('../fixtures/parsed-menu-content');

describe('src/slack.js', () => {
  describe('buildPayload', () => {
    const setup = ({ day } = {}) => {
      const data = {
        date: new Date('2019-02-01'),
        menuContent: fixture,
        pkgVersion: '1.33.7',
        pkgBugsUrl: 'https://the-bugs-url.com',
        canteenUrl: 'https://the-canteen-url.com',
      };

      const mocks = {
        getDay: jest.fn(() => day),
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
      const result = buildPayload(data.date, data.menuContent);

      return {
        data,
        mocks,
        result,
      };
    };

    describe('with canteen and cafe data', () => {
      let result;

      beforeAll(() => {
        ({ result } = setup({ day: 'monday' }));
      });

      afterAll(() => jest.resetModules());

      it('should return a snapshot match', () => {
        expect(result).toMatchSnapshot();
      });
    });

    describe('with no cafe content', () => {
      let result;

      beforeAll(() => {
        ({ result } = setup({ day: 'saturday' }));
      });

      afterAll(() => jest.resetModules());

      it('should return a snapshot match', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });
});

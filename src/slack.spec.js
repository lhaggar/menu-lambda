const fixture1 = require('../fixtures/parsed-menu-content-1');
const fixture2 = require('../fixtures/parsed-menu-content-2');

describe('src/slack.js', () => {
  describe('buildPayload', () => {
    const setup = ({ day, fixture = fixture1 } = {}) => {
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

    describe('with cafe content in canteen', () => {
      let result;

      beforeAll(() => {
        ({ result } = setup({ day: 'friday', fixture: fixture2 }));
      });

      afterAll(() => jest.resetModules());

      it('should return a snapshot match excluding the cafe content', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });
});

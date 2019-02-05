const { getDay } = require('./utils');

describe('src/utils.js', () => {
  describe('getDay', () => {
    it('should return "monday"', () => {
      expect(getDay(new Date('2019-02-04'))).toEqual('monday');
    });

    it('should return "tuesday"', () => {
      expect(getDay(new Date('2019-02-05'))).toEqual('tuesday');
    });

    it('should return "wednesday"', () => {
      expect(getDay(new Date('2019-02-06'))).toEqual('wednesday');
    });

    it('should return "thursday"', () => {
      expect(getDay(new Date('2019-02-07'))).toEqual('thursday');
    });

    it('should return "friday"', () => {
      expect(getDay(new Date('2019-02-08'))).toEqual('friday');
    });

    it('should return "saturday"', () => {
      expect(getDay(new Date('2019-02-09'))).toEqual('saturday');
    });

    it('should return "sunday"', () => {
      expect(getDay(new Date('2019-02-10'))).toEqual('sunday');
    });
  });
});

const { getDay, isWeekend } = require('./utils');

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

  describe('isWeekend', () => {
    it('should return false for monday', () => {
      expect(isWeekend(new Date('2019-02-04'))).toBe(false);
    });

    it('should return false for tuesday', () => {
      expect(isWeekend(new Date('2019-02-05'))).toBe(false);
    });

    it('should return false for wednesday', () => {
      expect(isWeekend(new Date('2019-02-06'))).toBe(false);
    });

    it('should return false for thursday', () => {
      expect(isWeekend(new Date('2019-02-07'))).toBe(false);
    });

    it('should return false for friday', () => {
      expect(isWeekend(new Date('2019-02-08'))).toBe(false);
    });

    it('should return true for saturday', () => {
      expect(isWeekend(new Date('2019-02-09'))).toBe(true);
    });

    it('should return true for sunday', () => {
      expect(isWeekend(new Date('2019-02-10'))).toBe(true);
    });
  });
});

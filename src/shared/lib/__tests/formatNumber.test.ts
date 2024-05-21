import {formatNumberWithPrecision} from '../formatNumber';

describe('formatNumber', () => {
  describe('formatNumberWithPrecision tests', () => {
    it('should return correct value: number = 10000, precision = 2', () => {
      const number = 10000;
      const precision = 2;
      const expected = '10,000.00';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });

    it('should return correct value: number = 10000, precision = 3', () => {
      const number = 10000;
      const precision = 3;
      const expected = '10,000.000';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });

    it('should return correct value: number = 0, precision = 4', () => {
      const number = 0;
      const precision = 4;
      const expected = '0.0000';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });

    it('should return correct value: number = 100.1, precision = 2', () => {
      const number = 100.1;
      const precision = 2;
      const expected = '100.10';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });

    it('should return correct value: number = 100.1, precision undefined', () => {
      const number = 100.1;
      const precision = undefined;
      const expected = '100.1';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });

    it("should return correct value: number = '100.2', precision = 3", () => {
      const number = '100.2';
      const precision = 3;
      const expected = '100.200';

      const actual = formatNumberWithPrecision(number, precision);

      expect(actual).toEqual(expected);
    });
  });
});

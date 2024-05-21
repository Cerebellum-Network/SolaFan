import {formatSocialCounterCount} from '../formatNumber';

describe('formatSocialCounterCount tests', () => {
  it('should return correct value: count = 100', () => {
    const count = '100';
    const expected = '100';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 1000', () => {
    const count = '1000';
    const expected = '1000';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 10000', () => {
    const count = '10000';
    const expected = '10K';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 10055', () => {
    const count = '10055';
    const expected = '10K';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 10500', () => {
    const count = '10500';
    const expected = '10.5K';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 10555', () => {
    const count = '10555';
    const expected = '10.6K';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 1000000', () => {
    const count = '1000000';
    const expected = '1M';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 1000050', () => {
    const count = '1000050';
    const expected = '1M';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 1500000', () => {
    const count = '1500000';
    const expected = '1.5M';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });

  it('should return correct value: count = 1555000', () => {
    const count = '1555000';
    const expected = '1.6M';

    const actual = formatSocialCounterCount(count);

    expect(actual).toEqual(expected);
  });
});

import {isNumberish} from '../numberish';

describe('src/shared/types/numberish.ts', () => {
  it('Numberish should be true for string that converts to safe integers', () => {
    expect(isNumberish(12)).toBe(true);
    expect(isNumberish('12')).toBe(true);
    expect(isNumberish(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumberish(Number.MAX_SAFE_INTEGER.toString())).toBe(true);
    expect(isNumberish(-1 * Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumberish((-1 * Number.MAX_SAFE_INTEGER).toString())).toBe(true);
  });

  it("Numberish should be false for string that can't converts to safe integers", () => {
    expect(isNumberish(1e30)).toBe(false);
    expect(isNumberish(Infinity)).toBe(false);
    expect(isNumberish(null)).toBe(false);
    expect(isNumberish(undefined)).toBe(false);
    expect(isNumberish({})).toBe(false);
    expect(isNumberish([])).toBe(false);
    expect(isNumberish(new Date())).toBe(false);
    expect(isNumberish(/test/)).toBe(false);
    expect(isNumberish(() => null)).toBe(false);
    expect(isNumberish('a12')).toBe(false);
    expect(isNumberish('a12')).toBe(false);
    expect(isNumberish(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    expect(isNumberish((Number.MAX_SAFE_INTEGER + 2).toString())).toBe(false);
    expect(isNumberish(-1 * Number.MAX_SAFE_INTEGER - 2)).toBe(false);
    expect(isNumberish((-1 * Number.MAX_SAFE_INTEGER - 2).toString())).toBe(false);
  });
});

import {unwrap} from '../unwrap';

describe('src/shared/lib/unwrap.ts', () => {
  it('should not throw if not undefined and not null', () => {
    expect(() => unwrap(2)).not.toThrow();
    expect(() => unwrap('2')).not.toThrow();
    expect(() => unwrap([])).not.toThrow();
  });
  it('should throw if undefined or null', () => {
    expect(() => unwrap(null)).toThrow();
    expect(() => unwrap(undefined)).toThrow();
  });
});

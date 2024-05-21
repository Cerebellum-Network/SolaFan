type Guard<T> = (val: unknown) => val is T;

export const assertGuard = <T>(val: unknown, guard: Guard<T>): T => {
  if (guard(val)) {
    return val;
  }
  throw Error(`Value not match required type guard ${JSON.stringify(val)}`);
};

export const createArrayGuard =
  <T>(guard: Guard<T>) =>
  (val: unknown): val is T[] =>
    Array.isArray(val) && val.every(guard);

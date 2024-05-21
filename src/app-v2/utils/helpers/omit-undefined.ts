export function omitUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

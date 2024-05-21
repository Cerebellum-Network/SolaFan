const DEFAULT_SEPARATOR = '~~~';

export function arrayToHash(array: string[]) {
  const copy = array.slice();
  copy.sort();
  return copy.join(DEFAULT_SEPARATOR);
}

export function hashToArray(hash: string, separator: string = DEFAULT_SEPARATOR): string[] {
  return hash
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

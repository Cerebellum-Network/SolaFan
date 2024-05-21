export const isRecord = (value: unknown): value is Record<string | number | symbol, unknown> =>
  value != null && typeof value === 'object';

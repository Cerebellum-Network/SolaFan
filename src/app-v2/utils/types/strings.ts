export const isString = (val: unknown): val is string => typeof val === 'string';

export const isStringOrNullish = (val: unknown): val is string | undefined => (val == null ? true : isString(val));

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isStringOrNullish = (val: unknown): val is string | undefined => (val == null ? true : isString(val));

export const isNotEmptyString = (val: unknown): val is string => isString(val) && val !== '';

export const isStringUrl = (val: unknown): val is string => {
  try {
    // eslint-disable-next-line no-new
    new URL(String(val));
    return true;
  } catch (e) {
    return false;
  }
};

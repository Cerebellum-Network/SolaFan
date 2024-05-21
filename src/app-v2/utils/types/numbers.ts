export const isNumber = (val: unknown): val is number => typeof val === 'number' && !Number.isNaN(val);

export const isPositiveNumber = (val: unknown): val is number => isNumber(val) && val > 0;

export const isNumberOrNullish = (val: unknown): val is number | undefined => (val == null ? true : isNumber(val));

export type Numberish = string | number;

export const isNumberish = (value: unknown): value is Numberish => {
  const number = value == null || typeof value === 'object' ? NaN : Number(value);
  return !isNaN(number) && Number.isSafeInteger(Math.round(number));
};

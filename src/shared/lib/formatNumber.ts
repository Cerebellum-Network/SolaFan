export const formatNumber = (number: number | string) => `${Number(number).toLocaleString('en-US')}`;
export const formatNumberWithPrecision = (number: number | string, precision: number | undefined = 0) =>
  `${Number(number).toLocaleString('en-US', {minimumFractionDigits: precision})}`;

export const formatSocialCounterCount = (count: string) => {
  // Return the string as it is. In CMS the value can be set, for example, as 112.54M
  if (isNaN(+count)) {
    return count;
  }
  if (count.length > 6) {
    return (+count / 1000000).toFixed(+count % 1000000 <= 100000 ? 0 : 1) + 'M';
  }
  if (count.length > 4) {
    return (+count / 1000).toFixed(+count % 1000 <= 100 ? 0 : 1) + 'K';
  }
  return count;
};

export const formatPriceUsd = (price: number, locale = 'en-US') =>
  Number(price).toLocaleString(locale, {maximumFractionDigits: 2});

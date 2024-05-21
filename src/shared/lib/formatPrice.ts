import {BigNumber, BigNumberish} from 'ethers';

import {TOKEN_DECIMALS_POW} from '../../config/common';
import {toBigNumber, toNumber} from './big-number-utils';

export const TOKEN_TITLE = 'USDC';
export const TOKEN_DIVIDER = 1000000;
export const ROUND_DIVIDER = 10000;
export const TOKEN_DECIMALS = BigNumber.from(10).pow(TOKEN_DECIMALS_POW);
export const MAX_FRACTION_VALUE = 10_000;
const CENTS_IN_USD = 100;

type FormatPriceParams = {
  currency?: string;
  prettify?: boolean;
};

export const cereToUSDCents = (price: BigNumberish, unitsPerPenny: BigNumberish = 1): number => {
  const ratio = toBigNumber(unitsPerPenny).eq(0) ? 1 : unitsPerPenny;
  return toNumber(toBigNumber(price).div(toBigNumber(ratio)));
};
// Cere units to USD
export const cereToUSD = (cereAmount: BigNumberish, unitsPerPenny: BigNumberish = 1) => {
  const ratio = toBigNumber(unitsPerPenny).eq(0) ? 1 : unitsPerPenny;
  return centToUSD(cereToUSDCents(cereAmount, ratio));
};
export const usdToCere = (usdAmount: number, unitsPerPenny: number) => cereCentToCere(usdAmount * 100 * unitsPerPenny);
export const cereCentToCere = (cerePrice: BigNumberish): number =>
  Number(toNumber(toBigNumber(cerePrice).div(TOKEN_DECIMALS)).toFixed(5));
export const centToUSD = (price: BigNumberish): number => Number(toNumber(toBigNumber(price).div(100)).toFixed(2));
export const formatPrice = (price: BigNumberish, {currency = '$', prettify = true}: FormatPriceParams = {}): string => {
  return `${currency}${prettify ? toNumber(price).toFixed(2) : toNumber(price)}`;
};
export const usdcUnitsToUSD = (amount: BigNumberish): number => {
  return centToUSD(toBigNumber(amount).div(toBigNumber(10).pow(TOKEN_DECIMALS_POW)).mul(CENTS_IN_USD));
};
export const roundTwoNonZeroDecimals = (value: number) => {
  const log10 = value ? Math.floor(Math.log10(value)) : 0,
    div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  return Math.round(value * div) / div;
};

export const formatBidValue = (value: string): string => {
  const numericValue = value.replace(/([^0-9,.])/, '').replace(/^0+(?=\d+)/, '');
  const amountExec = /^([1-9][0-9]*|0)([.,]\d*)?/.exec(numericValue);

  return amountExec ? amountExec[0] : '0';
};

export const decimalsPriceToUsd = (price: number): number => {
  return Math.round(toBigNumber(price).div(TOKEN_DECIMALS).mul(100).toNumber()) / 100;
};

export const usdWithCentsToDecimals = (usdValue: number, decimals: number): BigNumber => {
  const centsValue = BigNumber.from(Math.round(usdValue * 100));
  return centsValue.mul(BigNumber.from(10).pow(decimals)).div(100);
};

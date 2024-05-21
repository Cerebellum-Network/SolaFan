import {TOKEN_DECIMALS_POW} from './common';

export const regex = {
  currencyUsd: /^[+]?\d{1,6}(,\d{3})*(\.\d{0,2})?$/,
  currencyCere: new RegExp(`^[+]?\\d+(,\\d{3})*(\\.\\d{0,${TOKEN_DECIMALS_POW}})?$`),
};

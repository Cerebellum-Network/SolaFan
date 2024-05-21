import {toBigNumber, toNumber} from '../../../shared/lib/big-number-utils';
import {decimalsPriceToUsd, TOKEN_DECIMALS} from '../../../shared/lib/formatPrice';

export const transformTokensToPrice = (tokens: number): number => decimalsPriceToUsd(tokens);

export const transformPriceToTokens = (price: number): number => toNumber(toBigNumber(price).div(TOKEN_DECIMALS));

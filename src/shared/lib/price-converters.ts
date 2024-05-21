import {BigNumber, BigNumberish} from 'ethers';

import {toBigNumber} from './big-number-utils';

export const usdToDecimals = (price: number, decimals: BigNumberish): BigNumber => {
  const priceWithFactor = Number(price.toFixed(2)) * 100;
  const correctedDecimals = toBigNumber(decimals).sub(2);
  return BigNumber.from(10).pow(correctedDecimals).mul(priceWithFactor);
};

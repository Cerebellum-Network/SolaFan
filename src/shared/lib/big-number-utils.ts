import {BigNumber, BigNumberish} from 'ethers';

export const toBigNumber = (val?: BigNumberish): BigNumber => {
  try {
    return typeof val === 'number' ? BigNumber.from(BigInt(val)) : BigNumber.from(val);
  } catch (e) {
    return BigNumber.from(0);
  }
};

export const toNumber = (val?: BigNumberish): number => {
  return Number(toBigNumber(val).toString());
};

export const bigNumberishToString = (val?: BigNumberish): string => {
  return toBigNumber(val).toString();
};

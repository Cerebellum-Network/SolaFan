import {BigNumber, BigNumberish} from 'ethers';

export const unitToDecimals = (val: BigNumberish, decimals: number): BigNumber => {
  const multiplied = Number(val) * Math.pow(10, decimals);
  return BigNumber.from(multiplied.toString());
};

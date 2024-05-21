import {BigNumber, BigNumberish} from 'ethers';

const unitInDecimals = (decimals: BigNumberish) => BigNumber.from(10).pow(decimals);

export const unitToDecimals = (val: BigNumberish, decimals: number): BigNumber =>
  BigNumber.from(val).mul(unitInDecimals(decimals));

import {BigNumberish} from 'ethers';

export const formatNumber = (val: BigNumberish): string => {
  return new Intl.NumberFormat('en-EN', {maximumFractionDigits: 2}).format(Number(val) || 0);
};

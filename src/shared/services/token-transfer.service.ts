import {Collection, Freeport} from '@cere/freeport-sdk';
import {BigNumberish} from 'ethers';

import {GAS_LIMIT as gasLimit, GAS_PRICE as gasPrice} from '../../config/common';
import {toBigNumber} from '../lib/big-number-utils';

type Params = {
  from: string;
  toAccount: string;
  tokenId: string;
  amount: BigNumberish;
  gasLimit?: BigNumberish;
};

export const safeTransferFrom = async (
  contract: Freeport | Collection,
  {from, toAccount, tokenId, amount}: Params,
): Promise<string> => {
  const amountToSend = toBigNumber(amount);

  console.log('params: ', {from, toAccount, tokenId, amount});

  const tx = await contract.safeTransferFrom(from, toAccount, tokenId, amountToSend, [0], {
    gasLimit,
    gasPrice,
  });

  await tx.wait();
  return tx.hash;
};

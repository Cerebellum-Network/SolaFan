import {GAS_LIMIT as gasLimit} from '../../config/common';
import {toBigNumber} from '../lib/big-number-utils';
import {TOKEN_DECIMALS} from '../lib/formatPrice';
import {getERC20} from '../lib/get-erc20';
import {getFreeport} from '../lib/get-freeport';
import {NonCustodyWallet} from '../types/non-custody-wallet';
import {isAppWallet, SupportedWallet} from '../types/supported-wallet';

export const getERC20balance = async (userPublicKey: string, userToken: string): Promise<number> => {
  const erc20 = await getERC20(userToken);
  const amountBN = await erc20.balanceOf(userPublicKey);

  return amountBN.div(TOKEN_DECIMALS).toNumber();
};

export const deposit = async (amount: number, userToken: string): Promise<string> => {
  const amountToSend = toBigNumber(amount).mul(TOKEN_DECIMALS).toString();

  const erc20 = await getERC20(userToken);
  const freeport = await getFreeport(userToken);

  const tx1 = await erc20.approve(freeport.address, amountToSend, {gasLimit});

  const tx2 = await freeport.deposit(amountToSend, {nonce: tx1.nonce + 1, gasLimit});

  const confirm = async () => {
    await tx1.wait();
    await tx2.wait();
  };

  await confirm();

  return tx2.hash;
};

export const getSelectedWalletPublicKey = (
  selectedWallet: SupportedWallet | undefined,
  userPublicKey: string | undefined,
  nonCustodyWallets: NonCustodyWallet[],
): string | undefined => {
  return isAppWallet(selectedWallet)
    ? userPublicKey
    : nonCustodyWallets.find(({type}) => type === selectedWallet)?.publicKey;
};

export const getActiveEthereumWallet = async (): Promise<string> => {
  const ethereum: any = window.ethereum;
  const accounts: string[] = await ethereum?.request({method: 'eth_requestAccounts'});
  return accounts?.[0].toLowerCase() || '';
};

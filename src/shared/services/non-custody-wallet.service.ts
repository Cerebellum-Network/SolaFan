import {IDENTITY_API_URL} from '../../config/common';
import {del, get, post} from '../lib/request';
import {nonCustodyWalletRawToNonCustodyWalletMapper} from '../mappers/non-custody-wallet.mapper';
import {isRecord} from '../types/is-record';
import {NonCustodyWallet, NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {isNonCustodyWalletRaw} from '../types/non-custody-wallet-raw';

export const fetchNonCustodyWallets = async (jwtToken: string): Promise<NonCustodyWallet[]> => {
  const wallets = await get(`/non-custody-wallets`, {
    base: IDENTITY_API_URL(),
    headers: {Authorization: `Bearer ${jwtToken}`},
  });

  if (!isRecord(wallets) || !Array.isArray(wallets.data)) {
    throw new Error('Bad request for non-custodial wallets');
  }

  return wallets.data.filter(isNonCustodyWalletRaw).map(nonCustodyWalletRawToNonCustodyWalletMapper);
};

export const postNonCustodyWallet = async (
  jwtToken: string,
  type: NonCustodyWalletTypeEnum,
  publicKey: string,
): Promise<NonCustodyWallet> => {
  const wallet = await post(
    `/non-custody-wallets`,
    {
      type,
      publicKey,
    },
    {
      base: IDENTITY_API_URL(),
      headers: {Authorization: `Bearer ${jwtToken}`},
    },
  );

  if (!isRecord(wallet) || !isNonCustodyWalletRaw(wallet.data)) {
    throw new Error('Unknown format for the wallet.');
  }

  return nonCustodyWalletRawToNonCustodyWalletMapper(wallet.data);
};

export const deleteNonCustodyWallet = async (jwtToken: string, type: NonCustodyWalletTypeEnum): Promise<void> => {
  await del(
    `/non-custody-wallets`,
    {
      type,
    },
    {
      base: IDENTITY_API_URL(),
      headers: {Authorization: `Bearer ${jwtToken}`},
    },
  );
};

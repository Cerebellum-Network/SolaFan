import {NonCustodyWallet} from '../types/non-custody-wallet';
import {NonCustodyWalletRaw} from '../types/non-custody-wallet-raw';

export const nonCustodyWalletRawToNonCustodyWalletMapper = ({
  id,
  type,
  publicKey,
  createdAt,
  updatedAt,
}: NonCustodyWalletRaw): NonCustodyWallet => ({
  id,
  type,
  publicKey,
  createdAt,
  updatedAt,
});

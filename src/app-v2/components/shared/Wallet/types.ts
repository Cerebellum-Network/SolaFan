import {SupportedWalletType} from '../../../models/wallet/types';

export type WalletType = {
  type: SupportedWalletType;
  title: string;
  icon: JSX.Element;
  walletBalance: string;
  nftsCount: number;
  publicKey?: string;
};

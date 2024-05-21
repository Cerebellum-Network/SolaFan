import {CmsAppConfig} from '@cere/services-types';

import {SupportedWallet} from '../../../shared/types/supported-wallet';

export enum SupportedWalletType {
  CEREWALLET = 'TORUS',
  METAMASK = 'METAMASK',
  WALLETCONNECT = 'WALLETCONNECT',
  APP = 'APP',
}

export type ConnectWalletOptions = {
  appConfig: CmsAppConfig;
  email?: string;
};

export type NonCustodyWallets = {
  type: SupportedWallet;
  publicKey: string;
};

export const isSupportedWalletType = (val: unknown): val is SupportedWalletType =>
  val === SupportedWalletType.CEREWALLET ||
  val === SupportedWalletType.METAMASK ||
  val === SupportedWalletType.WALLETCONNECT ||
  val === SupportedWalletType.APP;

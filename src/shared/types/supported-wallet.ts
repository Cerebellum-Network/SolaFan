import {isNonCustodyWalletType, NonCustodyWalletTypeEnum} from './non-custody-wallet';

export const ALL_WALLET = 'all';

export type AllWallets = SupportedWallet | typeof ALL_WALLET;

export enum AppWallet {
  DAVINCI = 'DAVINCI',
}

export const isAppWallet = (val: unknown): val is AppWallet => val === 'DAVINCI';

export type SupportedWallet = NonCustodyWalletTypeEnum | AppWallet;

export const isSupportedWallet = (val: unknown): val is SupportedWallet =>
  isNonCustodyWalletType(val) || isAppWallet(val);

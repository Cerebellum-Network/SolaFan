import {SupportedWalletType} from '../../models/wallet/types';
import {UserWalletRecord} from './types';

export interface IWalletsApi {
  saveConnectedWallet(type: SupportedWalletType, userPublicKey: string): Promise<UserWalletRecord>;
  getConnectedWallets(): Promise<UserWalletRecord[]>;
  removeConnectedWallet(type: SupportedWalletType): Promise<void>;
}

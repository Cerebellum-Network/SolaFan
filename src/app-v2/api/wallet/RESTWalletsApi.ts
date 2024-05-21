import {AxiosInstance} from 'axios';

import {SupportedWalletType} from '../../models/wallet/types';
import {IWalletsApi} from './IWalletsApi';
import {UserWalletRecord} from './types';

export class RESTWalletsApi implements IWalletsApi {
  constructor(private readonly walletsClient: AxiosInstance) {}

  async getConnectedWallets(): Promise<UserWalletRecord[]> {
    const {data: wallets} = await this.walletsClient.get('/non-custody-wallets');
    return wallets.data.map((wallet: any) => ({
      id: wallet.id,
      type: wallet.type as SupportedWalletType,
      publicKey: wallet.publicKey,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    }));
  }

  async removeConnectedWallet(type: SupportedWalletType): Promise<void> {
    await this.walletsClient.delete('/non-custody-wallets', {data: {type}});
  }

  async saveConnectedWallet(type: SupportedWalletType, userPublicKey: string): Promise<UserWalletRecord> {
    const {data: wallet} = await this.walletsClient.post('/non-custody-wallets', {
      type,
      publicKey: userPublicKey,
    });
    return {
      id: wallet.data.id,
      type: wallet.data.type as SupportedWalletType,
      publicKey: wallet.data.publicKey,
      createdAt: wallet.data.createdAt,
      updatedAt: wallet.data.updatedAt,
    };
  }
}

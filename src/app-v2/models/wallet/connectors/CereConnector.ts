import {WalletEvent} from '@cere/embed-wallet';
import {Web3Provider} from '@ethersproject/providers';

import {CereWallet} from '../CereWallet';
import {ConnectWalletOptions, SupportedWalletType} from '../types';
import {IWalletConnector} from './IWalletConnector';

export class CereConnector implements IWalletConnector {
  readonly type = SupportedWalletType.CEREWALLET;

  constructor(private readonly torusWallet: CereWallet) {}

  async preload(options?: ConnectWalletOptions): Promise<unknown> {
    await this.torusWallet.init(options);
    return this.torusWallet.isReady();
  }

  async connectToWallet(options?: ConnectWalletOptions): Promise<Web3Provider> {
    await this.torusWallet.connect(options);
    return this.torusWallet.getProvider();
  }

  async disconnect(): Promise<void> {
    await this.torusWallet.disconnect();
  }

  async openWallet(): Promise<void> {
    await this.torusWallet.openWallet();
  }

  isNewUser(): Promise<boolean> {
    return this.torusWallet.isNewUser();
  }

  subscribe(event: WalletEvent, handler: (data: unknown) => void) {
    return this.torusWallet.subscribe(event, handler);
  }
}

export const getTorusConnector = (torusWallet: CereWallet) => new CereConnector(torusWallet);

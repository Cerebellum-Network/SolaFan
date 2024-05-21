import {WalletEvent} from '@cere/embed-wallet';
import {enableBiconomy} from '@cere/freeport-sdk';
import {Web3Provider} from '@ethersproject/providers';

import {BICONOMY_API_KEY, ENV} from '../../../../config/common';
import {ConnectWalletOptions, SupportedWalletType} from '../types';
import {IWalletConnector} from './IWalletConnector';

export class BiconomyConnectorDecorator implements IWalletConnector {
  type: SupportedWalletType;

  constructor(private readonly connector: IWalletConnector) {
    this.type = connector.type;
    Object.defineProperty(BiconomyConnectorDecorator, 'name', {value: connector.constructor.name});
  }

  preload(options?: ConnectWalletOptions): Promise<unknown> {
    return this.connector.preload ? this.connector.preload(options) : Promise.resolve();
  }

  async connectToWallet(options?: ConnectWalletOptions): Promise<Web3Provider> {
    let provider = await this.connector.connectToWallet(options);
    if (BICONOMY_API_KEY) {
      provider = await enableBiconomy(provider, BICONOMY_API_KEY, ['dev', 'stage'].includes(ENV));
    }
    return provider;
  }

  async disconnect(): Promise<void> {
    await this.connector.disconnect?.();
  }

  async openWallet(): Promise<void> {
    await this.connector.openWallet?.();
  }

  async isNewUser(): Promise<boolean | undefined> {
    return this.connector.isNewUser?.();
  }

  subscribe(event: WalletEvent, handler: (data: unknown) => void) {
    return this.connector.subscribe?.(event, handler);
  }
}

import {WalletEvent} from '@cere/embed-wallet';
import {providers} from 'ethers';

import {ConnectWalletOptions, SupportedWalletType} from '../types';

export interface IWalletConnector {
  type: SupportedWalletType;
  preload?(options?: ConnectWalletOptions): Promise<unknown>;
  connectToWallet(options?: ConnectWalletOptions): Promise<providers.Web3Provider>;
  disconnect?(): Promise<void>;
  openWallet?(): Promise<void>;
  isNewUser?(): Promise<boolean | undefined>;
  subscribe(event: WalletEvent, handler: (...args: any[]) => void): void;
}

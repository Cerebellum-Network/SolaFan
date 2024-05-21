import {importProvider} from '@cere/freeport-sdk';
import {providers} from 'ethers';

import {NETWORK_ID} from '../../../../config/common';
import {MetaMaskNotInstalledError} from '../errors/MetaMaskNotInstalledError';
import {NetworkIdNotConfiguredError} from '../errors/NetworkIdNotConfiguredError';
import {NetworkNotSupportedError} from '../errors/NetworkNotSupportedError';
import {SupportedWalletType} from '../types';
import {BiconomyConnectorDecorator} from './BiconomyConnectorDecorator';
import {IWalletConnector} from './IWalletConnector';

export class MetamaskConnector implements IWalletConnector {
  readonly type = SupportedWalletType.METAMASK;
  private eventHandlers: Map<any, ((data: unknown) => void)[]> = new Map();

  constructor(private readonly networkId: number) {
    if (!networkId) {
      throw new NetworkIdNotConfiguredError();
    }
  }

  async connectToWallet(): Promise<providers.Web3Provider> {
    this.clearNotMetamaskProviders();
    const provider = importProvider();
    await this.switchNetwork(provider);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    await signer.signMessage(`Account:${account} Nonce: ${Date.now()}`);
    return provider;
  }

  subscribe(event: any, handler: (data: unknown) => void): void {
    let handlers = this.eventHandlers.get(event);
    if (!handlers) {
      handlers = [];
      this.eventHandlers.set(event, handlers);
    }
    handlers.push(handler);
  }

  private clearNotMetamaskProviders(): void {
    const windowEthereum: any = window.ethereum;

    if (!windowEthereum || (!windowEthereum.isMetaMask && !windowEthereum.providers)) {
      throw new MetaMaskNotInstalledError();
    }

    if (!windowEthereum.providers) {
      return;
    }

    const metamaskProvider = windowEthereum.providers.find((p: any) => p.isMetaMask);
    if (!metamaskProvider) {
      throw new MetaMaskNotInstalledError();
    }

    window.ethereum = metamaskProvider;
  }

  private async switchNetwork(provider: providers.Web3Provider): Promise<void> {
    try {
      await provider.send('wallet_switchEthereumChain', [{chainId: `0x${this.networkId.toString(16)}`}]);
    } catch {
      throw new NetworkNotSupportedError(this.networkId);
    }
  }
}

export const getMetamaskConnector = () => new BiconomyConnectorDecorator(new MetamaskConnector(NETWORK_ID));

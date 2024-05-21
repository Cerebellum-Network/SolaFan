import {WalletEvent} from '@cere/embed-wallet';
import {providers} from 'ethers';

import {IWalletConnector} from './connectors/IWalletConnector';
import {NetworkNotSupportedError} from './errors/NetworkNotSupportedError';
import {WalletNotConnectedError} from './errors/WalletNotConnectedError';
import {ConnectWalletOptions, SupportedWalletType} from './types';
import {WalletConnectionStorage} from './WalletConnectionStorage';

export class WalletConnectionManager {
  private provider: providers.Web3Provider | null = null;
  private availableConnectors: Map<SupportedWalletType, IWalletConnector> = new Map<
    SupportedWalletType,
    IWalletConnector
  >();
  private availableProviders: Map<SupportedWalletType, providers.Web3Provider> = new Map<
    SupportedWalletType,
    providers.Web3Provider
  >();

  constructor(private readonly walletConnectionStorage: WalletConnectionStorage, private readonly networkId: number) {}

  async connect(connector: IWalletConnector, options?: ConnectWalletOptions): Promise<string> {
    this.availableConnectors.set(connector.type, connector);
    this.provider = await connector.connectToWallet(options);
    this.availableProviders.set(connector.type, this.provider);
    const connectedNetwork = await this.provider.getNetwork();
    if (connectedNetwork.chainId !== this.networkId) {
      await this.disconnect(connector.type);
      throw new NetworkNotSupportedError(this.networkId);
    }

    const address = await this.provider.getSigner().getAddress();
    this.walletConnectionStorage.addConnectedWalletType(connector.type);
    return address.toLowerCase();
  }

  async disconnect(type: SupportedWalletType): Promise<void> {
    const connector = this.availableConnectors.get(type);
    if (connector?.disconnect) {
      await connector.disconnect();
    }
    this.availableConnectors.delete(type);
    this.provider = null;
    this.walletConnectionStorage.removeConnectedWalletType(type);
  }

  async getSigner(): Promise<providers.JsonRpcSigner | null> {
    return this.provider?.getSigner() ?? null;
  }

  setActiveWallet(type: SupportedWalletType): void {
    const provider = this.availableProviders.get(type);
    if (!provider) {
      throw new WalletNotConnectedError(type);
    }
    this.walletConnectionStorage.setLastActiveWallet(type);
    this.provider = provider;
  }

  async signRaw(publicKey: string): Promise<string> {
    const signer = await this.getSigner();
    if (!signer) {
      return '';
    }
    const normalizedPublicKey = publicKey?.toLowerCase();
    return await signer.signMessage(normalizedPublicKey);
  }

  async showWallet(type: SupportedWalletType) {
    const connector = this.availableConnectors.get(type);
    if (connector?.openWallet) {
      await connector.openWallet();
    }
  }

  async isNewUser(type: SupportedWalletType) {
    const connector = this.availableConnectors.get(type);
    if (connector?.isNewUser) {
      return connector.isNewUser();
    }
  }

  subscribe(type: SupportedWalletType, event: WalletEvent, handler: (...args: any[]) => void) {
    const connector = this.availableConnectors.get(type);
    return connector?.subscribe(event, handler);
  }
}

import {WalletEvent} from '@cere/embed-wallet';
import {providers} from 'ethers';

import {IWalletConnector} from './connectors/IWalletConnector';
import {MissingWalletConnectorError} from './errors/MissingWalletConnectorError';
import {NoConnectedWalletsError} from './errors/NoConnectedWalletsError';
import {ConnectWalletOptions, SupportedWalletType} from './types';
import {WalletConnectionManager} from './WalletConnectionManager';
import {WalletConnectionStorage} from './WalletConnectionStorage';

export class WalletConnectionService {
  private connectedWalletsAddresses: Map<SupportedWalletType, string> = new Map<SupportedWalletType, string>();

  constructor(
    private readonly connectionManager: WalletConnectionManager,
    private readonly walletConnectionStorage: WalletConnectionStorage,
    private readonly walletsConnectors: Map<SupportedWalletType, IWalletConnector>,
  ) {}

  async restoreAllWalletsConnection(options?: ConnectWalletOptions): Promise<void> {
    const connectedWalletsTypes = this.walletConnectionStorage.getConnectedWalletsTypes();
    while (connectedWalletsTypes.length) {
      const type = connectedWalletsTypes.shift();
      if (!type) {
        return;
      }
      await this.connectWalletByType(type, options);
    }
    const lastActiveWalletType = this.walletConnectionStorage.getLastActiveWalletType();
    if (!lastActiveWalletType) {
      return;
    }
    this.connectionManager.setActiveWallet(lastActiveWalletType);
  }

  async preloadWalletByType(type: SupportedWalletType, options?: ConnectWalletOptions): Promise<unknown> {
    const wallet = this.getWalletConnectorByType(type);
    if (wallet && wallet.preload) {
      return wallet.preload(options);
    }
    return null;
  }

  async connectWalletByType(type: SupportedWalletType, options?: ConnectWalletOptions): Promise<string> {
    const address = await this.connectionManager.connect(this.getWalletConnectorByType(type), options);
    this.connectedWalletsAddresses.set(type, address);
    return address;
  }

  async disconnectWalletByType(type: SupportedWalletType): Promise<void> {
    this.connectedWalletsAddresses.delete(type);
    return await this.connectionManager.disconnect(type);
  }

  async getSigner(): Promise<providers.JsonRpcSigner> {
    const signer = await this.connectionManager.getSigner();
    if (!signer) {
      throw new NoConnectedWalletsError();
    }
    return signer;
  }

  getSelectedWalletAddress(): string {
    const selectedWalletType = this.getActiveWalletType();
    return this.getWalletAddressByType(selectedWalletType);
  }

  getWalletAddressByType(type: SupportedWalletType): string {
    const walletAddress = this.connectedWalletsAddresses.get(type);
    if (!walletAddress) {
      throw new NoConnectedWalletsError();
    }
    return walletAddress;
  }

  getWalletTypeByAddress(address: string): SupportedWalletType {
    const walletEntry = Array.from(this.connectedWalletsAddresses.entries()).find(
      ([, walletAddress]) => walletAddress === address,
    );
    if (!walletEntry) {
      throw new NoConnectedWalletsError();
    }
    const [walletType] = walletEntry;
    return walletType;
  }

  getConnectedWalletsAddresses(): string[] {
    return Array.from(this.connectedWalletsAddresses.values());
  }

  setActiveWalletType(type: SupportedWalletType) {
    this.connectionManager.setActiveWallet(type);
  }

  getActiveWalletType(): SupportedWalletType {
    const type = this.walletConnectionStorage.getLastActiveWalletType();
    if (!type) {
      throw new NoConnectedWalletsError();
    }
    return type;
  }

  getAllConnectedWalletsTypes(): SupportedWalletType[] {
    const connectedWalletsTypes = this.walletConnectionStorage.getConnectedWalletsTypes();
    if (!connectedWalletsTypes.length) {
      throw new NoConnectedWalletsError();
    }
    return connectedWalletsTypes;
  }

  addConnectedWallets(types: SupportedWalletType[]): void {
    this.walletConnectionStorage.setConnectedWalletsTypes(types);
  }

  async signRaw(publicKey: string) {
    return await this.connectionManager.signRaw(publicKey);
  }

  private getWalletConnectorByType(type: SupportedWalletType): IWalletConnector {
    const connector = this.walletsConnectors.get(type);
    if (!connector) {
      throw new MissingWalletConnectorError(type);
    }
    return connector;
  }

  showWallet(type: SupportedWalletType) {
    return this.connectionManager.showWallet(type);
  }

  isNewUser(type: SupportedWalletType) {
    return this.connectionManager.isNewUser(type);
  }

  subscribe(type: SupportedWalletType, event: WalletEvent, handler: (...args: any[]) => void) {
    this.connectionManager.subscribe(type, event, handler);
  }
}

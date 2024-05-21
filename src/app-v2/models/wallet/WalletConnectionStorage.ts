import {SupportedWalletType} from './types';

const LAST_ACTIVE_WALLET_TYPE = 'last_active_wallet_type';
const CONNECTED_WALLETS = 'connected_wallets';

export class WalletConnectionStorage {
  setLastActiveWallet(type: SupportedWalletType): void {
    window.localStorage.setItem(LAST_ACTIVE_WALLET_TYPE, type);
  }

  setConnectedWalletsTypes(types: SupportedWalletType[]) {
    window.localStorage.setItem(CONNECTED_WALLETS, types.join(','));
  }

  getLastActiveWalletType(): SupportedWalletType | null {
    const lastConnectedWalletType = window.localStorage.getItem(LAST_ACTIVE_WALLET_TYPE);
    if (!lastConnectedWalletType) {
      return SupportedWalletType.CEREWALLET;
    }
    return lastConnectedWalletType as SupportedWalletType;
  }

  getConnectedWalletsTypes(): SupportedWalletType[] {
    const typesString = window.localStorage.getItem(CONNECTED_WALLETS);
    if (!typesString) {
      return [];
    }
    return typesString.split(',') as SupportedWalletType[];
  }

  addConnectedWalletType(type: SupportedWalletType) {
    const connectedTypes = this.getConnectedWalletsTypes();
    if (connectedTypes.includes(type)) {
      return;
    }
    connectedTypes.push(type);
    this.setConnectedWalletsTypes(connectedTypes);
  }

  removeConnectedWalletType(type: SupportedWalletType) {
    const connectedTypes = this.getConnectedWalletsTypes().filter((t) => t !== type);
    this.setConnectedWalletsTypes(connectedTypes);
  }

  clearAll(): void {
    window.localStorage.removeItem(LAST_ACTIVE_WALLET_TYPE);
    window.localStorage.removeItem(CONNECTED_WALLETS);
  }
}

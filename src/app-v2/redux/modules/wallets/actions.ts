import {UserWalletRecord} from '../../../api/wallet/types';
import {SupportedWalletType} from '../../../models/wallet/types';
import {isRecord} from '../../../utils/types/is-record';
import {BaseAction} from '../../base/BaseAction';

const USER_WALLETS = '[USER WALLETS]';

export class RestoreWalletsConnectionCommand extends BaseAction {
  static type = `${USER_WALLETS} Restore all wallets connection`;
}

export class WalletsConnectionRestoredEvent extends BaseAction {
  static type = `${USER_WALLETS} All wallets connection restored`;
}

export class WalletsConnectionRestorationFailedEvent {
  static type = `${USER_WALLETS} Connection restoration failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class ConnectWalletCommand {
  static type = `${USER_WALLETS} Connect wallet`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class WalletConnectedEvent {
  static type = `${USER_WALLETS} Wallet connected`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class WalletConnectionFailedEvent {
  static type = `${USER_WALLETS} Wallet connection failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class DisconnectWalletCommand {
  static type = `${USER_WALLETS} Disconnect wallet`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class WalletDisconnectedEvent {
  static type = `${USER_WALLETS} Wallet disconnected`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class WalletDisconnectionFailedEvent {
  static type = `${USER_WALLETS} Wallet disconnection failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class ConnectedWalletsTypesDocument {
  static type = `${USER_WALLETS} Connected wallets types`;
  static create(walletsTypes: SupportedWalletType[]) {
    return {
      type: this.type,
      payload: walletsTypes,
    };
  }
}

export class ActiveWalletTypeDocument {
  static type = `${USER_WALLETS} Active wallet type`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class SelectWalletTypeCommand {
  static type = `${USER_WALLETS} Select wallet type`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class StartWalletsBalancePollingCommand extends BaseAction {
  static type = `${USER_WALLETS} Start balance polling`;
}

export class WalletsBalanceDocument {
  static type = `${USER_WALLETS} Wallets balance`;
  static create(walletsBalance: {[key: string]: number}) {
    return {
      type: this.type,
      payload: walletsBalance,
    };
  }
}

export class SetNonCustodyWalletsCommand {
  static type = `${USER_WALLETS} Set non custody wallets`;
  static create(wallets: UserWalletRecord[]) {
    return {
      type: this.type,
      payload: wallets,
    };
  }
}

export class ConnectCereWallet {
  static type = `${USER_WALLETS} Connect Cere Wallet`;

  static create(
    walletType: SupportedWalletType,
    nftData?: {nftId: string; orderId: string; qty: number},
    email?: string,
  ) {
    return {
      type: this.type,
      payload: {
        walletType,
        ...(isRecord(nftData) ? nftData : {}),
        email,
      },
    };
  }
}

export class OpenWallet {
  static type = `${USER_WALLETS} Open Cere Wallet`;
  static create(walletType: SupportedWalletType) {
    return {
      type: this.type,
      payload: walletType,
    };
  }
}

export class ResetWalletState extends BaseAction {
  static type = `${USER_WALLETS} Reset Wallets State`;
}

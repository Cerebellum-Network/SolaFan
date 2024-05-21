import {BigNumberish} from 'ethers';

import {BuyCollectibleModal} from '../../../components/connected/PurchaseModals/BuyCollectibleModal';
import {PurchaseFromMinterModal} from '../../../components/connected/PurchaseModals/PurchaseFromMinterModal';
import {PurchaseOnMarketplaceModal} from '../../../components/connected/PurchaseModals/PurchaseOnMarketplaceModal';
import {UpdatedPurchaseFailedModal} from '../../../components/connected/PurchaseModals/UpdatedPurchaseFailedModal';
import {UpdatedPurchaseSuccessfulModal} from '../../../components/connected/PurchaseModals/UpdatedPurchaseSuccessfulModal';
import {BaseAction} from '../../base/BaseAction';

const NFT = '[NFT]';

export class StartPrimaryNFTPurchaseCommand {
  static type = `${NFT} Start NFT purchase from minter`;
  static create(nftId: string, orderId: string, qty: number = 1, returnTo = '') {
    return {
      type: this.type,
      payload: {
        nftId,
        orderId,
        qty,
        returnTo,
      },
    };
  }
}

export class StartSecondaryNFTPurchaseCommand {
  static type = `${NFT} Start NFT purchase on marketplace`;
  static create(nftId: string, orderId: string, sellerWalletAddress: string, price: BigNumberish, qty: number = 1) {
    return {
      type: this.type,
      payload: {
        nftId,
        orderId,
        sellerWalletAddress,
        price,
        qty,
      },
    };
  }
}

export class PurchaseNFTForCryptoCommand {
  static type = `${NFT} Purchase NFT for crypto`;

  static create(nftId: string, orderId: string, sellerWalletAddress: string, price: number, qty: number = 1) {
    return {
      type: this.type,
      payload: {
        nftId,
        orderId,
        sellerWalletAddress,
        price,
        qty,
      },
    };
  }
}

export class PurchaseNFTForFiatCommand {
  static type = `${NFT} Purchase NFT for fiat`;

  static create(nftId: string, orderId: string, qty: number = 1, email = '', returnTo = '') {
    return {
      type: this.type,
      payload: {
        nftId,
        qty,
        orderId,
        email,
        returnTo,
      },
    };
  }
}

export class PurchaseWindowReplaceResultCommand {
  static type = `${NFT} Purchase With window replace type`;

  static create(nftId: string, orderId: string, qty: number = 1, email?: string, sessionId?: string) {
    return {
      type: this.type,
      payload: {
        nftId,
        qty,
        orderId,
        email,
        sessionId,
      },
    };
  }
}

export class NFTPurchaseStartedEvent extends BaseAction {
  static type = `${NFT} Purchase started`;
}

export class PurchaseNFTSuccessEvent {
  static type = `${NFT} Purchase success`;
  static create(id: string) {
    return {
      type: this.type,
      payload: id,
    };
  }
}

export class PurchaseNFTFailedEvent {
  static type = `${NFT} Purchase failed`;
  static create(nftId: string, message: string) {
    return {
      type: this.type,
      payload: {nftId, message},
    };
  }
}

export class CancelPurchaseCommand extends BaseAction {
  static type = `${NFT} Cancel purchase`;
}

// ToDo: Update the actions below after purchase modals are migrated
export class ShowStartPurchaseFromMinterModalCommand {
  static type = `[MODAL] Show start purchase from minter modal`;
  static create(nftId: string, orderId: string, qty: number) {
    return {
      type: this.type,
      payload: {nftId, orderId, qty},
      component: PurchaseFromMinterModal,
    };
  }
}

export class ShowStartPurchaseOnMarketplaceModalCommand {
  static type = `[MODAL] Show start purchase on marketplace modal`;
  static create(nftId: string, orderId: string, sellerWalletAddress: string, price: BigNumberish, qty: number) {
    return {
      type: this.type,
      component: PurchaseOnMarketplaceModal,
      payload: {
        nftId,
        orderId,
        sellerWalletAddress,
        price,
        qty,
      },
    };
  }
}

export class ShowContinuePurchaseModalCommand {
  static type = `[MODAL] Show continue purchase modal`;
  static create(nftId: string, sellerWalletAddress: string, price: number, qty: number) {
    return {
      type: this.type,
      payload: {
        nftId,
        sellerWalletAddress,
        price,
        qty,
      },
    };
  }
}

export class ShowPurchaseSuccessModalCommand {
  static type = `[MODAL] Show purchase success modal`;
  static create(nftId: string, price: number, qty: number, email?: string) {
    return {
      type: this.type,
      payload: {nftId, price, qty, email},
      component: UpdatedPurchaseSuccessfulModal,
    };
  }
}

export class ShowPurchaseFailedModalCommand {
  static type = `[MODAL] Show purchase failed modal`;
  static create(nftId: string, orderId: string, price: number, qty: number, email?: string) {
    return {
      type: this.type,
      payload: {nftId, orderId, price, qty, email},
      component: UpdatedPurchaseFailedModal,
    };
  }
}

export class ShowBuyCollectibleModalCommand {
  static type = `[MODAL] Show Buy Collectible modal`;

  static create({nftId, orderId, qty}: {nftId: string; orderId: string; qty: number}) {
    return {
      type: this.type,
      payload: {nftId, orderId, qty},
      component: BuyCollectibleModal,
    };
  }
}

import {BigNumberish} from 'ethers';

import {DeleteOrderModal} from '../../../components/connected/SellModals/DeleteOrderModal';
import {SellFailedModal} from '../../../components/connected/SellModals/SellFailedModal';
import {SellModal} from '../../../components/connected/SellModals/SellModal';
import {SellSuccessModal} from '../../../components/connected/SellModals/SellSuccessModal';
import {BaseAction} from '../../base/BaseAction';

const NFT = '[NFT]';

export class StartNFTSellingCommand {
  static type = `${NFT} Start selling`;
  static create(nftId: string) {
    return {
      type: this.type,
      payload: nftId,
    };
  }
}

export class SellNFTCommand {
  static type = `${NFT} Sell`;
  static create(nftId: string, itemPrice: BigNumberish, amount: number) {
    return {
      type: this.type,
      payload: {
        nftId,
        price: itemPrice,
        amount,
      },
    };
  }
}

export class NFTSellSuccessEvent extends BaseAction {
  static type = `${NFT} Sell success`;
}

export class NFTSellFailedEvent {
  static type = `${NFT} Sell failed`;
  static create(nftId: string, message: string) {
    return {
      type: this.type,
      payload: {
        nftId,
        message,
      },
    };
  }
}

export class CancelNFTSellingCommand {
  static type = `${NFT} Cancel selling`;
  static create(nftId: string, orderId: string) {
    return {
      type: this.type,
      payload: {nftId, orderId},
    };
  }
}

export class CancelNFTSellingSuccessEvent extends BaseAction {
  static type = `${NFT} Sell cancel success`;
}

export class CancelNFTSellingFailedEvent {
  static type = `${NFT} Sell cancel failed`;
  static create(nftId: string, message: string) {
    return {
      type: this.type,
      payload: {
        nftId,
        message,
      },
    };
  }
}

export class ShowSellNFTModalCommand {
  static type = `[MODAL] Show sell NFT modal`;
  static create(nftId: string) {
    return {
      type: this.type,
      component: SellModal,
      payload: {nftId},
    };
  }
}

export class ShowNFTSellSuccessModalCommand {
  static type = `[MODAL] Show NFT sell success modal`;
  static create(nftId: string, price: number, qty: number) {
    return {
      type: this.type,
      component: SellSuccessModal,
      payload: {nftId, price, qty},
    };
  }
}

export class ShowNFTSellFailedModalCommand {
  static type = `[MODAL] Show NFT sell failed modal`;
  static create(nftId: string, price: number, qty: number) {
    return {
      type: this.type,
      component: SellFailedModal,
      payload: {nftId, price, amount: qty},
    };
  }
}

export class ShowCancelNFTSellingModalCommand {
  static type = `[MODAL] Show cancel NFT selling modal`;
  static create(nftId: string, qty: number, orderId: string) {
    return {
      type: this.type,
      component: DeleteOrderModal,
      payload: {nftId, qty, orderId},
    };
  }
}

export class ShowNFTSellingCancelSuccessModalCommand extends BaseAction {
  static type = `[MODAL] Show NFT selling cancel success modal`;
}

export class ShowNFTSellingCancelFailedModalCommand {
  static type = `[MODAL] Show NFT selling cancel failed modal`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

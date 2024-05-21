import {PlaceBidFailedModal} from '../../../components/connected/BidModals/PlaceBidFailedModal';
import {PlaceBidModal} from '../../../components/connected/BidModals/PlaceBidModal';
import {PlaceBidSuccessModal} from '../../../components/connected/BidModals/PlaceBidSuccessModal';

const NFT = '[NFT]';

export class StartBidFlowCommand {
  static type = `${NFT} Start bid flow`;
  static create(nftId: string, sellerWalletAddress: string) {
    return {
      type: this.type,
      payload: {
        nftId,
        sellerWalletAddress,
      },
    };
  }
}

export class PlaceBidCommand {
  static type = `${NFT} Place bid`;
  static create(nftId: string, auctionId: string, sellerWalletAddress: string, price: number) {
    return {
      type: this.type,
      payload: {
        nftId,
        auctionId,
        price,
        sellerWalletAddress,
      },
    };
  }
}

export class PlaceBidSuccessEvent {
  static type = `${NFT} Place bid success`;
  static create(nftId: string, price: number) {
    return {
      type: this.type,
      payload: {
        nftId,
        price,
      },
    };
  }
}

export class PlaceBidFailedEvent {
  static type = `${NFT} Place bid failed`;
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

export class CreateAuctionCommand {
  static type = `${NFT} Create auction`;
  static create(nftId: string, startingPrice: number, amount: number, duration: number) {
    return {
      type: this.type,
      payload: {
        nftId,
        startingPrice,
        amount,
        duration,
      },
    };
  }
}

export class CreateAuctionSuccessEvent {
  static type = `${NFT} Create auction success`;
  static create(nftId: string) {
    return {
      type: this.type,
      payload: nftId,
    };
  }
}

export class CreateAuctionFailedEvent {
  static type = `${NFT} Create auction failed`;
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

export class SettleAuctionCommand {
  static type = `${NFT} Settle auction`;
  static create(nftId: string, auctionId: string) {
    return {
      type: this.type,
      payload: {nftId, auctionId},
    };
  }
}

export class SettleAuctionSuccessEvent {
  static type = `${NFT} Settle auction success`;
  static create(nftId: string) {
    return {
      type: this.type,
      payload: nftId,
    };
  }
}

export class SettleAuctionFailedEvent {
  static type = `${NFT} Settle auction failed`;
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

export class ShowBidModalCommand {
  static type = `[MODAL] Show bid modal`;
  static create(nftId: string, minBidPrice: number, sellerWalletAddress: string) {
    return {
      type: this.type,
      component: PlaceBidModal,
      payload: {
        nftId,
        minBidPrice,
        sellerWalletAddress,
      },
    };
  }
}

export class ShowBidSuccessModalCommand {
  static type = `[MODAL] Show bid success modal`;
  static create(nftId: string, price: number) {
    return {
      type: this.type,
      component: PlaceBidSuccessModal,
      payload: {
        nftId,
        price,
      },
    };
  }
}

export class ShowBidFailedModalCommand {
  static type = `[MODAL] Show bid failed modal`;
  static create(nftId: string, price: number, sellerWalletAddress: string, message: string) {
    return {
      type: this.type,
      component: PlaceBidFailedModal,
      payload: {
        nftId,
        price,
        sellerWalletAddress,
        message,
      },
    };
  }
}

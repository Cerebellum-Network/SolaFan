import {DownloadContentModal} from '../../../components/connected/DownloadContentModal';
import {Order} from '../../../types/order';
import {TransfersWithParams} from '../../../types/transfer';
import {BaseAction} from '../../base/BaseAction';

export class LoadNftPageDataCommand {
  static type = '[NFT Page] Load NFT data';
  static create(nftId: string) {
    return {
      type: this.type,
      payload: {nftId},
    };
  }
}

export class UpdateNftDataCommand {
  static type = `[NFT Page] Update nft data`;

  static create(nftId: string, delay = 0) {
    return {
      type: this.type,
      payload: {nftId, delay},
    };
  }
}

export class ResetNftPageLoadingStateCommand extends BaseAction {
  static type = '[NFT Page] Reset loading state';
}

export class NftDataLoadedEvent extends BaseAction {
  static type = '[NFT Page] NFT data loaded';
}

export class NftListingsLoadedEvent extends BaseAction {
  static type = '[NFT Page] NFT listings loaded';
}

export class NftListingsLoadingFailedEvent extends BaseAction {
  static type = '[NFT Page] NFT listings loading failed';
}

export class NftCollectablesLoadedEvent extends BaseAction {
  static type = '[NFT Page] NFT collectables loaded';
}

export class NftPageDataLoadingFailedEvent extends BaseAction {
  static type = '[NFT Page] NFT page data failed';
}

export class NftOrdersDocument {
  static type = '[NFT Page] NFT orders';
  static create(orders: Order[]) {
    return {
      type: this.type,
      payload: orders,
    };
  }
}

export class ShowDownloadContentModal {
  static type = '[NFT Page] Show download NFT content modal';

  static create(nftId: string) {
    return {
      type: this.type,
      payload: {nftId},
      component: DownloadContentModal,
    };
  }
}

export class SubscribeToCreatorDrops {
  static type = '[NFT Page] Subscribe to creator drops';

  static create(creatorId: string) {
    return {
      type: this.type,
      payload: {creatorId},
    };
  }
}

export class LoadNftTransfersCommand {
  static type = `[NFT Page] Load NFT transfers`;
  static create(nftId: string, collectionAddress: string) {
    return {
      type: this.type,
      payload: {nftId, collectionAddress},
    };
  }
}

export class TransferDocument {
  static type = `[NFT Page] Transfer document`;
  static create(nft: TransfersWithParams[]) {
    return {
      type: this.type,
      payload: nft,
    };
  }
}

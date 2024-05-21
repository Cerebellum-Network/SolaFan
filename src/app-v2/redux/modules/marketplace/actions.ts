import {NftCardInterface} from '@cere/services-types';

import {BaseAction} from '../../base/BaseAction';

const MARKETPLACE = '[MARKETPLACE]';

export class LoadMarketplaceDataCommand extends BaseAction {
  static type = `${MARKETPLACE} Load data`;
}

export class MarketplaceFeaturedNftsDocument {
  static type = `${MARKETPLACE} Featured NFTs`;
  static create(nfts: NftCardInterface[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class MarketplaceSecondaryNftsDocument {
  static type = `${MARKETPLACE} Secondary NFTs`;
  static create(nfts: NftCardInterface[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class MarketplaceFeaturedNftsLoadingFailedEvent {
  static type = `${MARKETPLACE} Featured NFTs loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class MarketplaceSecondaryNftsLoadingFailedEvent {
  static type = `${MARKETPLACE} Secondary NFTs loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

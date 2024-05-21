import {ExhibitCardInterface, FullCreatorInterface, NftCardInterface} from '@cere/services-types';

import {BannerItem} from '../../../api/home-page/types';
import {ConnectWalletDialog} from '../../../components/connected/ConnectWalletDialog';
import {BaseAction} from '../../base/BaseAction';

export const HOME = '[HOME]';

export class LoadHomePageDataCommand extends BaseAction {
  static type = `${HOME} Load page data`;
}

export class BannerItemsDocument {
  static type = `${HOME} Banner items document`;
  static create(items: BannerItem[]) {
    return {
      type: this.type,
      payload: items,
    };
  }
}

export class FeaturedNftsDocument {
  static type = `${HOME} Featured NFTs document`;
  static create(nfts: NftCardInterface[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class NftCollectablesDocument {
  static type = `${HOME} NFT collectables document`;
  static create(nfts: NftCardInterface[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class FeaturedCreatorsDocument {
  static type = `${HOME} Featured creators document`;
  static create(creators: FullCreatorInterface[]) {
    return {
      type: this.type,
      payload: creators,
    };
  }
}

export class FeaturedEventsDocument {
  static type = `${HOME} Featured events document`;
  static create(events: ExhibitCardInterface[]) {
    return {
      type: this.type,
      payload: events,
    };
  }
}

export class BannerItemsLoadingFailedEvent {
  static type = `${HOME} Banner items loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class FeaturedNftsLoadingFailedEvent {
  static type = `${HOME} Featured NFTs loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class NftsCollectablesLoadingFailedEvent {
  static type = `${HOME} Collectable NFTs loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class FeaturedCreatorsLoadingFailedEvent {
  static type = `${HOME} Featured creators loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class FeaturedEventsLoadingFailedEvent {
  static type = `${HOME} Featured events loading failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class SellNftsClickEvent {
  static type = `${HOME} Get Started sellNfts click`;
  static create() {
    return {
      type: this.type,
      payload: null,
    };
  }
}

export class ConnectWalletClickEvent {
  static type = `${HOME} Get Started connect wallet click`;
  static create() {
    return {
      type: this.type,
      payload: null,
    };
  }
}

export class ShowConnectYourWalletDialogCommand {
  static type = `[MODAL] Show connect your wallet dialog`;
  static create() {
    return {
      type: this.type,
      payload: null,
      component: ConnectWalletDialog,
    };
  }
}

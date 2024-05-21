import {NftCardInterface} from '@cere/services-types/dist/types';

import {BaseAction} from '../../base/BaseAction';

const OVERLAY = '[OVERLAY]';

export class OverlayNftsCommand {
  static type = `[OVERLAY MODAL] start fetch overlay modal nfts`;
  static create(slug: string) {
    return {
      type: this.type,
      payload: {slug},
    };
  }
}

export class OverlayNftsDocument {
  static type = `[OVERLAY MODAL] Overlay nfts`;
  static create(nfts: NftCardInterface[] | unknown) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class FetchOverlayStartedEvent extends BaseAction {
  static type = `${OVERLAY} Overlay nfts fetching started`;
}

export class FetchOverlayFinishedEvent extends BaseAction {
  static type = `${OVERLAY} Overlay nfts fetching finished`;
}

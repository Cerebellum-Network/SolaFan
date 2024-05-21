import {ExhibitCardInterface, NftCardInterface} from '@cere/services-types/dist/types';

import {AboutExhibit} from '../../../components/connected/AboutExhibit/about-exhibit';
import {AccessNftInfoModal} from '../../../components/connected/AccessNftInfoModel';
import {AuctionOverlay} from '../../../components/connected/AuctionOverlay';
import {EndExhibitVideo} from '../../../components/connected/EndExhibitVideo';
import {ShareExhibitModal} from '../../../components/connected/ShareExhibitModal';
import {ShareNftModal} from '../../../components/connected/ShareNftModal';
import {CmsExhibit} from '../../../types/exhibit';
import {BaseAction} from '../../base/BaseAction';

const EXHIBIT = '[EXHIBIT]';

// event
export class FetchEventCommand {
  static type = `${EXHIBIT} Fetch event`;

  static create(isPreviewMode: boolean, slug: string) {
    return {
      type: this.type,
      payload: {
        isPreviewMode,
        slug,
      },
    };
  }
}

export class FetchEventStartedEvent extends BaseAction {
  static type = `${EXHIBIT} Event fetching started`;
}

export class FetchEventFinishedEvent extends BaseAction {
  static type = `${EXHIBIT} Event fetching finished`;
}

export class EventDocument {
  static type = `${EXHIBIT} Event document`;
  static create(event: CmsExhibit | undefined) {
    return {
      type: this.type,
      payload: event,
    };
  }
}

export class FetchEventError {
  static type = `${EXHIBIT} Event document`;
  static create(error: Error) {
    return {
      type: this.type,
      payload: error,
    };
  }
}

// moreExhibits
export class FetchMoreExhibitsCommand {
  static type = `${EXHIBIT} Fetch more exhibits`;

  static create(creatorId: string) {
    return {
      type: this.type,
      payload: {creatorId},
    };
  }
}

export class FetchMoreExhibitsStartedEvent extends BaseAction {
  static type = `${EXHIBIT} More exhibits fetching started`;
}

export class FetchMoreExhibitsFinishedEvent extends BaseAction {
  static type = `${EXHIBIT} More exhibits fetching finished`;
}

export class MoreExhibitsDocument {
  static type = `${EXHIBIT} More exhibits document`;
  static create(exhibit: ExhibitCardInterface[] | undefined) {
    return {
      type: this.type,
      payload: exhibit,
    };
  }
}

export class FetchMoreExhibitsError {
  static type = `${EXHIBIT} MoreExhibit fetch error`;
  static create(error: Error) {
    return {
      type: this.type,
      payload: error,
    };
  }
}

export class ShowShareExhibitModalCommand {
  static type = `[MODAL] Share`;
  static create(exhibitId: string) {
    return {
      type: this.type,
      payload: {exhibitId},
      component: ShareExhibitModal,
    };
  }
}

export class ShowShareNftModalCommand {
  static type = `[MODAL] Share`;
  static create(nftId: string) {
    return {
      type: this.type,
      payload: {nftId},
      component: ShareNftModal,
    };
  }
}

export class ShowAccessNftInfoModalCommand {
  static type = `[MODAL] Nft Info`;
  static create(accessTokenType: boolean, title: string) {
    return {
      type: this.type,
      payload: {accessTokenType, title},
      component: AccessNftInfoModal,
    };
  }
}

export class ShowAboutExhibitModal {
  static type = `[MODAL] About exhibit`;
  static create(exclusiveNfts: NftCardInterface[] | null, slug: string) {
    return {
      type: this.type,
      payload: {
        exclusiveNfts,
        slug,
      },
      component: AboutExhibit,
    };
  }
}

export class ShowEndExhibitVideoModal {
  static type = `[MODAL] End of Exhibit video`;
  static create(
    morePopularExhibits: ExhibitCardInterface[] | null,
    onShareExhibit: (exhibitId: string) => void,
    onPlayAgain: () => void,
    slug: string,
  ) {
    return {
      type: this.type,
      payload: {
        morePopularExhibits,
        onShareExhibit,
        onPlayAgain,
        slug,
      },
      component: EndExhibitVideo,
    };
  }
}

export class ShowPurchaseNftFromVideoModal {
  static type = `[MODAL] Purchase from video`;
  static create(slug: string) {
    return {
      type: this.type,
      component: AuctionOverlay,
      payload: {slug},
    };
  }
}

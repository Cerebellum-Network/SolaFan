import {ExhibitCardInterface, FullCreatorInterface} from '@cere/services-types/dist/types';

import {BaseAction} from '../../base/BaseAction';

export class LoadCreatorPageDataCommand {
  static type = '[Creator Page] Load Creator data';
  static create(creatorId: string) {
    return {
      type: this.type,
      payload: {creatorId},
    };
  }
}

export class ResetCreatorPageLoadingStateCommand extends BaseAction {
  static type = '[Creator Page] Reset loading state';
}

export class CreatorLoadingEvent extends BaseAction {
  static type = '[Creator Page] Creator data loading';
}

export class CreatorLoadedEvent extends BaseAction {
  static type = '[Creator Page] Creator data loaded';
}

export class CreatorLoadingFailedEvent extends BaseAction {
  static type = '[Creator Page] Creator page data failed';
}

export class CreatorExhibitsLoadingEvent extends BaseAction {
  static type = '[Creator Page] Creator exhibits loading';
}

export class CreatorExhibitsLoadedEvent extends BaseAction {
  static type = '[Creator Page] Creator exhibits loaded';
}

export class CreatorExhibitsLoadingFailedEvent extends BaseAction {
  static type = '[Creator Page] Creator exhibits loading failed';
}

export class CreatorExhibitsDocument {
  static type = '[Creator Page] Creator exhibits';
  static create(exhibits: ExhibitCardInterface[]) {
    return {
      type: this.type,
      payload: exhibits,
    };
  }
}

export class CreatorNftsLoadingEvent extends BaseAction {
  static type = '[Creator Page] Creator nfts loading';
}

export class CreatorNftsLoadedEvent extends BaseAction {
  static type = '[Creator Page] Creator nfts loaded';
}

export class CreatorNftsLoadingFailedEvent extends BaseAction {
  static type = '[Creator Page] Creator nfts loading failed';
}

export class CreatorNftsDocument {
  static type = '[Creator Page] Creator nfts';
  static create(nfts: any[]) {
    return {
      type: this.type,
      payload: nfts,
    };
  }
}

export class CreatorsLoadingEvent extends BaseAction {
  static type = '[Creator Page] Creators loading';
}

export class CreatorsLoadedEvent extends BaseAction {
  static type = '[Creator Page] Creators loaded';
}

export class CreatorsFeaturedFailedEvent extends BaseAction {
  static type = '[Creator Page] Featured creators failed';
}

export class CreatorsDocument {
  static type = '[Creator Page] Creators';
  static create(creators: FullCreatorInterface[]) {
    return {
      type: this.type,
      payload: creators,
    };
  }
}

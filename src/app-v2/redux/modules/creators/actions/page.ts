import {FullCreatorInterface} from '@cere/services-types';

import {BaseAction} from '../../../base/BaseAction';

const CREATORS = '[CREATORS]';

export class FetchCreatorsCommand extends BaseAction {
  static type = `${CREATORS} Fetch all`;
}

export class CreatorsDocument {
  static type = `${CREATORS} Creators document`;
  static create(creators: FullCreatorInterface[]) {
    return {
      type: this.type,
      payload: creators,
    };
  }
}

export class CreatorDocument {
  static type = `${CREATORS} Creator document`;
  static create(creator: FullCreatorInterface) {
    return {
      type: this.type,
      payload: creator,
    };
  }
}

export class CreatorsFetchErrorEvent {
  static type = `${CREATORS} Creators fetch error`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class CreatorsFetchingStartedEvent extends BaseAction {
  static type = `${CREATORS} Creators fetching started`;
}

export class CreatorsFetchingFinishedEvent extends BaseAction {
  static type = `${CREATORS} Creators fetching finished`;
}

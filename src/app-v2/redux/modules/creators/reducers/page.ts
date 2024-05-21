import {FullCreatorInterface} from '@cere/services-types';
import {AnyAction} from 'redux';

import {
  CreatorDocument,
  CreatorsDocument,
  CreatorsFetchingFinishedEvent,
  CreatorsFetchingStartedEvent,
} from '../actions/page';

type AllCreators = {
  ids: string[];
  creators: {[key: string]: FullCreatorInterface | undefined};
};

const allCreatorsInitialState: AllCreators = {
  ids: [],
  creators: {},
};

export const allCreatorsReducer = (state: AllCreators = allCreatorsInitialState, action: AnyAction): AllCreators => {
  switch (action.type) {
    case CreatorsDocument.type: {
      const creators: FullCreatorInterface[] = action.payload;
      const ids = creators.map((c) => c.id);
      return {
        ids,
        creators: creators.reduce((acc, creator) => {
          acc[creator.id] = creator;
          return acc;
        }, {} as {[key: string]: FullCreatorInterface}),
      };
    }
    case CreatorDocument.type: {
      const creator: FullCreatorInterface = action.payload;
      const ids = [...state.ids];
      const creators = {...state.creators};
      ids.push(creator.id);
      creators[creator.id] = creator;
      return {
        ids,
        creators,
      };
    }
    default:
      return state;
  }
};

export const creatorsLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case CreatorsFetchingStartedEvent.type:
      return true;
    case CreatorsFetchingFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

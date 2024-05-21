import {ExhibitCardInterface, FullCreatorInterface} from '@cere/services-types/dist/types';
import {AnyAction, combineReducers} from 'redux';

import {Nft} from '../../../api/creator/types';
import {CreatorsFetchErrorEvent, CreatorsFetchingFinishedEvent, CreatorsFetchingStartedEvent} from '../creators';
import {
  CreatorExhibitsDocument,
  CreatorExhibitsLoadedEvent,
  CreatorExhibitsLoadingEvent,
  CreatorExhibitsLoadingFailedEvent,
  CreatorLoadedEvent,
  CreatorLoadingEvent,
  CreatorLoadingFailedEvent,
  CreatorNftsDocument,
  CreatorNftsLoadedEvent,
  CreatorNftsLoadingEvent,
  CreatorNftsLoadingFailedEvent,
  CreatorsDocument,
} from './actions';

const creatorLoading = (state: boolean = true, action: AnyAction): boolean => {
  switch (action.type) {
    case CreatorLoadingEvent.type:
      return true;
    case CreatorLoadedEvent.type:
    case CreatorLoadingFailedEvent.type:
      return false;
    default:
      return state;
  }
};

const exhibitionsLoading = (state: boolean = true, action: AnyAction): boolean => {
  switch (action.type) {
    case CreatorExhibitsLoadingEvent.type:
      return true;
    case CreatorExhibitsLoadedEvent.type:
    case CreatorExhibitsLoadingFailedEvent.type:
      return false;
    default:
      return state;
  }
};

const nftsLoading = (state: boolean = true, action: AnyAction): boolean => {
  switch (action.type) {
    case CreatorNftsLoadingEvent.type:
      return true;
    case CreatorNftsLoadedEvent.type:
    case CreatorNftsLoadingFailedEvent.type:
      return false;
    default:
      return state;
  }
};

const creatorsLoading = (state: boolean = true, action: AnyAction): boolean => {
  switch (action.type) {
    case CreatorsFetchingStartedEvent.type:
      return true;
    case CreatorsFetchingFinishedEvent.type:
    case CreatorsFetchErrorEvent.type:
      return false;
    default:
      return state;
  }
};

const loading = combineReducers({
  isCreatorLoading: creatorLoading,
  isLoadingCreatorExhibits: exhibitionsLoading,
  isLoadingCreatorNfts: nftsLoading,
  isLoadingCreators: creatorsLoading,
});

const creatorExhibitsReducer = (state: ExhibitCardInterface[] = [], action: AnyAction) => {
  if (action.type === CreatorExhibitsDocument.type) {
    return action.payload;
  }
  return state;
};

const creatorNftsReducer = (state: Nft[] | undefined, action: AnyAction): Nft[] => {
  if (action.type === CreatorNftsDocument.type) {
    return action.payload;
  }
  return state ?? [];
};

const creators = (state: FullCreatorInterface[] | null = null, action: AnyAction) => {
  if (action.type === CreatorsDocument.type) {
    return (action as ReturnType<typeof CreatorsDocument.create>).payload;
  }
  return state;
};

export const creatorDetailsPageReducer = combineReducers({
  loadingState: loading,
  exhibits: creatorExhibitsReducer,
  nfts: creatorNftsReducer,
  creators,
});

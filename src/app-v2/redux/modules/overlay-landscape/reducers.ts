import {NftCardInterface} from '@cere/services-types/dist/types';
import {AnyAction, combineReducers} from 'redux';

import {FetchOverlayFinishedEvent, FetchOverlayStartedEvent, OverlayNftsDocument} from './actions';

export const overlayReducer = (state: NftCardInterface[] = [], action: AnyAction): any => {
  switch (action.type) {
    case OverlayNftsDocument.type:
      return action.payload;
    default:
      return state;
  }
};

export const overlayLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchOverlayStartedEvent.type:
      return true;
    case FetchOverlayFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

export const overlayModuleReducer = combineReducers({
  overlayNfts: overlayReducer,
  overlayNftsLoading: overlayLoadingReducer,
});

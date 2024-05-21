import {AnyAction, combineReducers} from 'redux';

import {CollectorProfile} from '../../../api/collector/types';
import {FetchProfileFinished, FetchProfileStarted, ProfileDocument} from './actions';

export const collectorProfiles = (
  state: {[walletPublicKey: string]: CollectorProfile | undefined} = {},
  action: AnyAction,
) => {
  switch (action.type) {
    case ProfileDocument.type:
      const {walletPublicKey, collectorProfile} = action.payload;
      return walletPublicKey == null ? state : {...state, [walletPublicKey]: collectorProfile};
    default:
      return state;
  }
};

export const collectorProfilesLoadingState = (
  state: {[walletPublicKey: string]: boolean | undefined} = {},
  action: AnyAction,
) => {
  switch (action.type) {
    case FetchProfileStarted.type:
      return action.payload == null ? state : {...state, [action.payload]: true};
    case FetchProfileFinished.type:
      return {...state, [action.payload]: false};
    default:
      return state;
  }
};

export const myCollectorsProfile = (state: CollectorProfile | null = null, action: AnyAction) => {
  switch (action.type) {
    case ProfileDocument.type:
      const {walletPublicKey, collectorProfile} = action.payload;
      return walletPublicKey != null ? state : collectorProfile;
    default:
      return state;
  }
};

export const myCollectorsProfileLoadingState = (state: boolean = false, action: AnyAction) => {
  switch (action.type) {
    case FetchProfileStarted.type:
      return action.payload == null ? true : state;
    case FetchProfileFinished.type:
      return action.payload == null ? false : state;
    default:
      return state;
  }
};

export const collectorsModuleReducer = combineReducers({
  collectorProfiles,
  collectorProfilesLoadingState,
  myCollectorsProfile,
  myCollectorsProfileLoadingState,
});

export type CollectorsModuleState = ReturnType<typeof collectorsModuleReducer>;

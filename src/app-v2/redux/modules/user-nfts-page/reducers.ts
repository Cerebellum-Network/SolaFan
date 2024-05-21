import {AnyAction, combineReducers} from 'redux';
import {ALL_WALLET, AllWallets} from 'shared/types/supported-wallet';

import {FetchUserNftsFinishedEvent, FetchUserNftsStartedEvent, UserNftsActiveWallet, UserNftsDocument} from './actions';

export const userNftsPageReducer = (state: any = [], action: AnyAction): any => {
  // TODO add type for state and return type
  switch (action.type) {
    case UserNftsDocument.type:
      return action.payload;
    default:
      return state;
  }
};

export const userNftsPageLoadingReducer = (state: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case FetchUserNftsStartedEvent.type:
      return true;
    case FetchUserNftsFinishedEvent.type:
      return false;
    default:
      return state;
  }
};

export const userNftsPageActiveWallet = (state: AllWallets = ALL_WALLET, action: AnyAction): AllWallets => {
  switch (action.type) {
    case UserNftsActiveWallet.type:
      return action.payload;
    default:
      return state;
  }
};

export const userNftsPageModuleReducer = combineReducers({
  nfts: userNftsPageReducer,
  loading: userNftsPageLoadingReducer,
  activeWallet: userNftsPageActiveWallet,
});

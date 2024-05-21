import {AnyAction, combineReducers} from 'redux';

import {SupportedWalletType} from '../../../models/wallet/types';
import {
  ActiveWalletTypeDocument,
  ConnectedWalletsTypesDocument,
  ResetWalletState,
  SetNonCustodyWalletsCommand,
  WalletsBalanceDocument,
} from './actions';
import {statusesReducer} from './statuses/reducer';

type WalletsBalanceStore = {
  [key: string]: number;
};

export const selectedWalletReducer = (
  selectedWallet: SupportedWalletType = SupportedWalletType.CEREWALLET,
  action: AnyAction,
) => {
  if (action.type === ActiveWalletTypeDocument.type) {
    return action.payload;
  }
  return selectedWallet;
};

export const connectedWalletsReducer = (wallets: SupportedWalletType[] = [], action: AnyAction) => {
  if (action.type === ConnectedWalletsTypesDocument.type) {
    return action.payload;
  }
  return wallets;
};

export const walletsBalanceReducer = (store: WalletsBalanceStore = {}, action: AnyAction) => {
  if (action.type === WalletsBalanceDocument.type) {
    return action.payload;
  }
  return store;
};

export const nonCustodyWalletsReducer = (store: any = [], action: AnyAction) => {
  if (action.type === SetNonCustodyWalletsCommand.type) {
    return action.payload;
  } else if (action.type === ResetWalletState.type) {
    return [];
  }
  return store;
};

export const rootReducer = combineReducers({
  selectedWallet: selectedWalletReducer,
  connectedWallets: connectedWalletsReducer,
  walletsBalance: walletsBalanceReducer,
  nonCustodyWallets: nonCustodyWalletsReducer,
  statuses: statusesReducer,
});

export const userWalletsModuleReducer = (state: any, action: any) => {
  if (action.type === ResetWalletState.type) {
    state = undefined;
  }

  return rootReducer(state, action);
};

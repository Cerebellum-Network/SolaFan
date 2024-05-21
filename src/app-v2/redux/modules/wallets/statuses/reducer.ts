import {combineReducers} from 'redux';
import {handleActions, ReduxCompatibleReducer} from 'redux-actions';

import {SupportedWalletType} from '../../../../models/wallet/types';
import {setCereWalletReadiness} from './actions';

type Combination = {[key in SupportedWalletType]: ReduxCompatibleReducer<any, boolean>};

const identityReducer = (state = true) => state;

const cereWallet = handleActions(
  {
    [setCereWalletReadiness.toString()](_, {payload}) {
      return payload;
    },
  },
  false,
);

export const config: Combination = {
  [SupportedWalletType.CEREWALLET]: cereWallet,
  [SupportedWalletType.APP]: () => identityReducer,
  [SupportedWalletType.METAMASK]: () => identityReducer,
  [SupportedWalletType.WALLETCONNECT]: () => identityReducer,
};

export const statusesReducer = combineReducers(config);

import {createSelector} from 'reselect';

import {walletConnectionService} from '../../../models/wallet';
import {SupportedWalletType} from '../../../models/wallet/types';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {USER_WALLETS_MODULE_NAME} from './constants';
import {StatusesState} from './statuses/types';
import {WalletsStore} from './types';

const root = (state: any) => {
  if (!state[USER_WALLETS_MODULE_NAME]) {
    throw new NoSuchModuleError(USER_WALLETS_MODULE_NAME);
  }
  return state[USER_WALLETS_MODULE_NAME];
};

export const selectActiveWalletType = (store: WalletsStore): SupportedWalletType => {
  if (!store[USER_WALLETS_MODULE_NAME]) {
    throw new NoSuchModuleError(USER_WALLETS_MODULE_NAME);
  }
  return store[USER_WALLETS_MODULE_NAME].selectedWallet;
};

export const selectConnectedWalletTypes = (store: WalletsStore): SupportedWalletType[] => {
  if (!store[USER_WALLETS_MODULE_NAME]) {
    throw new NoSuchModuleError(USER_WALLETS_MODULE_NAME);
  }
  return store[USER_WALLETS_MODULE_NAME].connectedWallets;
};

export const selectActiveWalletBalance = (store: WalletsStore): number => {
  const activeWallet = selectActiveWalletType(store);
  try {
    const activeWalletAddress = walletConnectionService.getWalletAddressByType(activeWallet); // ToDo: get rid of direct service calling here
    return store[USER_WALLETS_MODULE_NAME].walletsBalance[activeWalletAddress];
  } catch (e) {
    console.debug(e.message);
    return 0;
  }
};

export const selectWalletBalance = (store: WalletsStore, walletType: SupportedWalletType): number | undefined => {
  try {
    const activeWalletAddress = walletConnectionService.getWalletAddressByType(walletType);
    return store[USER_WALLETS_MODULE_NAME].walletsBalance[activeWalletAddress];
  } catch (e) {
    console.debug(e.message);
    return 0;
  }
};

export const selectWalletBalances = (store: WalletsStore) => {
  try {
    return store[USER_WALLETS_MODULE_NAME].walletsBalance as {[key: string]: number};
  } catch (e) {
    console.debug(e.message);
    return {};
  }
};

export const selectWalletAddress = (store: WalletsStore, walletType?: SupportedWalletType): string | undefined => {
  try {
    if (walletType != null) {
      return walletConnectionService.getWalletAddressByType(walletType);
    }
    return Object.keys(store[USER_WALLETS_MODULE_NAME].walletsBalance)[0];
  } catch (e) {
    console.debug(e.message);
    return '';
  }
};

export const selectWalletPublicKeys = (store: WalletsStore): string[] => {
  const userWallets = store[USER_WALLETS_MODULE_NAME];
  try {
    return Object.keys(userWallets.walletsBalance);
  } catch (e) {
    console.debug(e.message);
    return [];
  }
};

export const selectNonCustodyWallets = (store: WalletsStore) => {
  return store[USER_WALLETS_MODULE_NAME].nonCustodyWallets || [];
};

const selectStatuses: (state: any) => StatusesState = createSelector(root, (wallets) => wallets.statuses);

export const selectCereWalletReadiness: (state: any) => boolean = createSelector(
  selectStatuses,
  (statuses) => statuses[SupportedWalletType.CEREWALLET],
);

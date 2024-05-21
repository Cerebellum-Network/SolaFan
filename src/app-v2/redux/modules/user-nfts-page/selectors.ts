import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {USER_NFTS_PAGE_MODULE_NAME} from './constants';

export const selectUserNftsPageStore = (store: any) => {
  if (!store[USER_NFTS_PAGE_MODULE_NAME]) {
    throw new NoSuchModuleError(USER_NFTS_PAGE_MODULE_NAME);
  }
  return store[USER_NFTS_PAGE_MODULE_NAME];
};

export const selectUserNfts = (store: any) => selectUserNftsPageStore(store).nfts;
export const selectUserNftsLoading = (store: any) => selectUserNftsPageStore(store).loading;
export const selectUserNftsActiveWallet = (store: any) => selectUserNftsPageStore(store).activeWallet;

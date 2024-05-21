import {Order} from '../../../types/order';
import {NftTransfer} from '../../../types/transfer';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {NFT_PAGE_MODULE_NAME} from './constants';
import {NftDetailsPageStore} from './types';

export const selectNftDetailsPageData = (state: NftDetailsPageStore) => {
  if (!state[NFT_PAGE_MODULE_NAME]) {
    throw new NoSuchModuleError(NFT_PAGE_MODULE_NAME);
  }
  return state[NFT_PAGE_MODULE_NAME];
};

export const selectNftOrders = (state: NftDetailsPageStore): Order[] => {
  return selectNftDetailsPageData(state).orders;
};

export const selectNftDetailsPageLoadingState = (state: NftDetailsPageStore) => {
  return selectNftDetailsPageData(state).loadingState;
};

export const selectNftTransfers = (state: NftDetailsPageStore): NftTransfer[] => {
  return selectNftDetailsPageData(state).transfers;
};

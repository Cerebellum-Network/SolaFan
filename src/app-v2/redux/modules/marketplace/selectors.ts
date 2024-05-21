import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {MARKETPLACE_MODULE_NAME} from './constants';
import {MarketplaceStore} from './types';

export const selectMarketplaceState = (store: MarketplaceStore) => {
  if (!store[MARKETPLACE_MODULE_NAME]) {
    throw new NoSuchModuleError(MARKETPLACE_MODULE_NAME);
  }
  return store[MARKETPLACE_MODULE_NAME];
};

import {NftsApi} from '../../../api/nfts/NftsApi';
import {StoreModule} from '../../base/types';
import {MARKETPLACE_MODULE_NAME} from './constants';
import {loadMarketplaceDataMiddleware} from './middlewares';
import {marketplaceModuleReducer} from './reducers';

export const createMarketplaceModule = (nftsApi: NftsApi): StoreModule => ({
  title: MARKETPLACE_MODULE_NAME,
  moduleReducer: marketplaceModuleReducer,
  middlewares: [loadMarketplaceDataMiddleware(nftsApi)],
});

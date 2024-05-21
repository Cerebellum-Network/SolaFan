import {MARKETPLACE_MODULE_NAME} from './constants';
import {marketplaceModuleReducer} from './reducers';

export type MarketplaceStore = {[MARKETPLACE_MODULE_NAME]: ReturnType<typeof marketplaceModuleReducer>};

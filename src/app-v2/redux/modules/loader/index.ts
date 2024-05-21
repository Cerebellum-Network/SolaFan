import {StoreModule} from '../../base/types';
import {LOADER_MODULE_NAME} from './constants';
import {loaderReducer} from './reducers';

export const createLoaderModule = (): StoreModule => ({
  title: LOADER_MODULE_NAME,
  moduleReducer: loaderReducer,
});

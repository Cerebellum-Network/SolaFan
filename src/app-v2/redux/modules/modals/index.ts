import {StoreModule} from '../../base/types';
import {MODALS_MODULE_NAME} from './constants';
import {activeModalReducer} from './reducers';

export const createModalsModule = (): StoreModule => ({
  title: MODALS_MODULE_NAME,
  moduleReducer: activeModalReducer,
});

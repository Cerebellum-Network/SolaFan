import {StoreModule} from '../../base/types';
import {NAVIGATION_MODULE_NAME} from './contants';
import {redirectMiddleware} from './middlewares';
import {historyReducer} from './reducers';

export const createNavigationModule = (): StoreModule => ({
  title: NAVIGATION_MODULE_NAME,
  moduleReducer: historyReducer,
  middlewares: [redirectMiddleware],
});

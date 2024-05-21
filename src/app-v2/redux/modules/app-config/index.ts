import {IAppConfigApi} from '../../../api/app-config/IAppConfigApi';
import {StoreModule} from '../../base/types';
import {APP_CONFIG_MODULE_NAME} from './constants';
import {loadAppConfigMiddleware, startAppConfigLoadingMiddleware} from './middlewares';
import {appConfigReducer} from './reducers';

export const createAppConfigModule = (configApi: IAppConfigApi): StoreModule => ({
  title: APP_CONFIG_MODULE_NAME,
  moduleReducer: appConfigReducer,
  middlewares: [startAppConfigLoadingMiddleware, loadAppConfigMiddleware(configApi)],
});

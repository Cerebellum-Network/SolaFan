import {IExhibitApi} from '../../../api/exhibit/IExhibitApi';
import {StoreModule} from '../../base/types';
import {EXHIBIT_MODULE_NAME} from './constants';
import {loadEventMiddleware, loadMoreExhibitsMiddleware} from './middlewares';
import {exhibitModuleReducer} from './reducers';

export * from './actions';

export const createExhibitPageModule = (exhibitApi: IExhibitApi): StoreModule => ({
  title: EXHIBIT_MODULE_NAME,
  moduleReducer: exhibitModuleReducer,
  middlewares: [loadEventMiddleware(exhibitApi), loadMoreExhibitsMiddleware(exhibitApi)],
});

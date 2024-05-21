import {IExhibitsApi} from '../../../api/exhibits/IExhibitsApi';
import {StoreModule} from '../../base/types';
import {EXHIBITS_PAGE_MODULE_NAME} from './constants';
import {loadExhibitsMiddleware, loadExhibitsSeoMiddleware, loadExhibitsWithFiltersMiddleware} from './middlewares';
import {exhibitsPageModuleReducer} from './reducers';

export const createExhibitsPageModule = (exhibitsApi: IExhibitsApi): StoreModule => ({
  title: EXHIBITS_PAGE_MODULE_NAME,
  moduleReducer: exhibitsPageModuleReducer,
  middlewares: [
    loadExhibitsMiddleware(exhibitsApi),
    loadExhibitsSeoMiddleware(exhibitsApi),
    loadExhibitsWithFiltersMiddleware(exhibitsApi),
  ],
});

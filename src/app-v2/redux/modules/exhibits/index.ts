import {IExhibitApi} from '../../../api/exhibit/IExhibitApi';
import {StoreModule} from '../../base/types';
import {EXHIBITS_MODULE_NAME} from './constants';
import {loadArrayExhibitsByIdsMiddleware} from './middlewares';
import {ExhibitReducer} from './reducers';

export const createExhibitsModule = (exhibitApi: IExhibitApi): StoreModule => ({
  title: EXHIBITS_MODULE_NAME,
  moduleReducer: ExhibitReducer,
  middlewares: [loadArrayExhibitsByIdsMiddleware(exhibitApi)],
});

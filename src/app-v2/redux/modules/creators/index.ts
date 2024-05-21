import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {StoreModule} from '../../base/types';
import {CREATORS_MODULE_NAME} from './constants';
import {loadCreatorsMiddleware} from './middlewares';
import {creatorsModuleReducer} from './reducer';

export * from './actions/page';

export const createCreatorsModule = (creatorsApi: ICreatorsApi): StoreModule => ({
  title: CREATORS_MODULE_NAME,
  moduleReducer: creatorsModuleReducer,
  middlewares: [loadCreatorsMiddleware(creatorsApi)],
});

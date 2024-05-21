import {CollectorApi} from '../../../api/collector/CollectorApi';
import {StoreModule} from '../../base/types';
import {fetchProfile} from './middlewares';
import {collectorsModuleReducer} from './reducers';
import {collectors} from './selectors';

export const createProfilePageModule = (profileApi: CollectorApi): StoreModule => ({
  title: collectors,
  moduleReducer: collectorsModuleReducer,
  middlewares: [fetchProfile(profileApi)],
});

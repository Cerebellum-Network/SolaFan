import {StoreModule} from '../../base/types';
import {videoModuleName} from './constants';
import {main} from './reducers';

export const videoModule: StoreModule = {
  title: videoModuleName,
  moduleReducer: main,
  middlewares: [],
};

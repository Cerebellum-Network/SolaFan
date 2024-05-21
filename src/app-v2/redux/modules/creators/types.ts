import {CREATORS_MODULE_NAME} from './constants';
import {creatorsModuleReducer} from './reducer';

export type CreatorsModuleStoreType = {[CREATORS_MODULE_NAME]: ReturnType<typeof creatorsModuleReducer>};

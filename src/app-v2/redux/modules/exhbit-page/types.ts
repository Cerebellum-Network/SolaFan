import {EXHIBIT_MODULE_NAME} from './constants';
import {exhibitModuleReducer} from './reducers';

export type ExhibitModuleStoreType = {[EXHIBIT_MODULE_NAME]: ReturnType<typeof exhibitModuleReducer>};

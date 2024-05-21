import {EXHIBITS_PAGE_MODULE_NAME} from './constants';
import {exhibitsPageModuleReducer} from './reducers';

export type ExhibitsPageStore = {[EXHIBITS_PAGE_MODULE_NAME]: ReturnType<typeof exhibitsPageModuleReducer>};

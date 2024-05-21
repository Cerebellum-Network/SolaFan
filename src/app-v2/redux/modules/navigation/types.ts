import {NAVIGATION_MODULE_NAME} from './contants';
import {historyReducer} from './reducers';

export type NavigationStoreType = {[NAVIGATION_MODULE_NAME]: ReturnType<typeof historyReducer>};

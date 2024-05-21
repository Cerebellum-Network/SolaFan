import {MODALS_MODULE_NAME} from './constants';
import {activeModalReducer} from './reducers';

export type ModalsStore = {[MODALS_MODULE_NAME]: ReturnType<typeof activeModalReducer>};

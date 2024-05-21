import {EXHIBITS_MODULE_NAME} from './constants';
import {ExhibitReducer} from './reducers';

export type ExhibitsStore = {[EXHIBITS_MODULE_NAME]: ReturnType<typeof ExhibitReducer>};

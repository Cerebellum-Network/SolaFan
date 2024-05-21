import {LOADER_MODULE_NAME} from './constants';
import {loaderReducer} from './reducers';

export type LoaderStore = {[LOADER_MODULE_NAME]: ReturnType<typeof loaderReducer>};

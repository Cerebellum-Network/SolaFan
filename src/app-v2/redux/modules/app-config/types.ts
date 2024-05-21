import {APP_CONFIG_MODULE_NAME} from './constants';
import {appConfigReducer} from './reducers';

type ConfigReducer = ReturnType<typeof appConfigReducer>;
export type AppConfigStore = {[APP_CONFIG_MODULE_NAME]: ConfigReducer['config']};

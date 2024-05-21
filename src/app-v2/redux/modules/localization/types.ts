import {LOCALIZATION_MODULE_NAME} from './constants';
import {userLocaleReducer} from './reducers';

export type LocalizationStorageType = {[LOCALIZATION_MODULE_NAME]: ReturnType<typeof userLocaleReducer>};

import {AUTH_MODULE_NAME} from './constants';
import {authReducer} from './reducers';

export type AuthState = ReturnType<typeof authReducer>;

export type AuthStore = {[AUTH_MODULE_NAME]: AuthState};

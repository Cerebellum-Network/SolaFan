import {USER_WALLETS_MODULE_NAME} from './constants';
import {userWalletsModuleReducer} from './reducers';

export type WalletsStore = {[USER_WALLETS_MODULE_NAME]: ReturnType<typeof userWalletsModuleReducer>};

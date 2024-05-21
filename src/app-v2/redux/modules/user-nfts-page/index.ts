import {IUserNftsApi} from '../../../api/user-nfts-page/IUserNftsApi';
import {StoreModule} from '../../base/types';
import {USER_NFTS_PAGE_MODULE_NAME} from './constants';
import {loadUserNfts} from './middlewares';
import {userNftsPageModuleReducer} from './reducers';
export const createUserNftsPageModule = (userNftsApi: IUserNftsApi): StoreModule => ({
  title: USER_NFTS_PAGE_MODULE_NAME,
  moduleReducer: userNftsPageModuleReducer,
  middlewares: [loadUserNfts(userNftsApi)],
});

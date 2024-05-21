import {USER_NFTS_PAGE_MODULE_NAME} from './constants';
import {userNftsPageModuleReducer} from './reducers';

export type UserNftsPageStore = {[USER_NFTS_PAGE_MODULE_NAME]: ReturnType<typeof userNftsPageModuleReducer>};

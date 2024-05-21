import {NFT_PAGE_MODULE_NAME} from './constants';
import {nftDetailsPageReducer} from './reducers';

export type NftDetailsPageStore = {[NFT_PAGE_MODULE_NAME]: ReturnType<typeof nftDetailsPageReducer>};

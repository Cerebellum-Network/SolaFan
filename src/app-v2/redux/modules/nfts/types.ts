import {NFTS_MODULE_NAME} from './constants';
import {allNftsReducer} from './reducers';

export type NftsStore = {[NFTS_MODULE_NAME]: ReturnType<typeof allNftsReducer>};

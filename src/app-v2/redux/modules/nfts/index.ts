import {NftsApi} from '../../../api/nfts/NftsApi';
import {StoreModule} from '../../base/types';
import {NFTS_MODULE_NAME} from './constants';
import {loadArrayNftsByIdsMiddleware, loadNftByIdMiddleware, updateNftMiddleware} from './middlewares';
import {allNftsReducer} from './reducers';

export const createNftsModule = (nftApi: NftsApi): StoreModule => ({
  title: NFTS_MODULE_NAME,
  moduleReducer: allNftsReducer,
  middlewares: [updateNftMiddleware, loadNftByIdMiddleware(nftApi), loadArrayNftsByIdsMiddleware(nftApi)],
});

import {NftsApi} from '../../../api/nfts/NftsApi';
import {ISellNftApi} from '../../../models/selling/ISellNftApi';
import {StoreModule} from '../../base/types';
import {SELLING_MODULE_NAME} from './constants';
import {cancelNftSellingMiddleware, sellNftMiddleware, startNftSellingMiddleware} from './middlewares';

export const createSellingModule = (nftApi: NftsApi, sellApi: ISellNftApi): StoreModule => ({
  title: SELLING_MODULE_NAME,
  middlewares: [startNftSellingMiddleware(nftApi), sellNftMiddleware(sellApi), cancelNftSellingMiddleware(sellApi)],
});

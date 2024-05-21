import {contractProvider} from '../blockchain';
import {FreeportSellNftApi} from './FreeportSellNftApi';
import {ISellNftApi} from './ISellNftApi';

export const sellNftApi: ISellNftApi = new FreeportSellNftApi(contractProvider);

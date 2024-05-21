import {contractProvider} from '../blockchain';
import {FreeportPurchaseNFTApi} from './FreeportPurchaseNFTApi';
import {IPurchaseNFTApi} from './IPurchaseNFTApi';

export const purchaseNftApi: IPurchaseNFTApi = new FreeportPurchaseNFTApi(contractProvider, 3);

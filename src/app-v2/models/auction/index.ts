import {contractProvider} from '../blockchain';
import {FreeportAuctionApi} from './FreeportAuctionApi';
import {IAuctionSCApi} from './IAuctionSCApi';

export const auctionSCApi: IAuctionSCApi = new FreeportAuctionApi(contractProvider);

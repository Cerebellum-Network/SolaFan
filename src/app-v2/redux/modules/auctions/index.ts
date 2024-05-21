import {IAuctionsApi} from '../../../api/auctions/IAuctionsApi';
import {AuctionService} from '../../../models/auction/AuctionService';
import {IAuctionSCApi} from '../../../models/auction/IAuctionSCApi';
import {StoreModule} from '../../base/types';
import {AUCTION_MODULE_NAME} from './constants';
import {createAuctionMiddleware, placeBidMiddleware, startNftBidFlowMiddleware} from './middlewares';

export const createAuctionsModule = (
  auctionsApi: IAuctionsApi,
  auctionSCApi: IAuctionSCApi,
  auctionService: AuctionService,
): StoreModule => ({
  title: AUCTION_MODULE_NAME,
  middlewares: [
    startNftBidFlowMiddleware(auctionsApi, auctionService),
    placeBidMiddleware(auctionSCApi),
    createAuctionMiddleware(auctionSCApi),
  ],
});

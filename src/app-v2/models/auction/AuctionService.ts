import {Auction} from '../../api/auctions/types';
import {InvalidAuctionDataError} from './errors/InvalidAuctionDataError';

const BID_RAISE_PERCENT = 10;

export class AuctionService {
  getLatestBidPriceForAuction(auction: Auction): number {
    const latestBidPrice = auction.bids?.[0]?.price ?? auction.price;
    if (!latestBidPrice) {
      throw new InvalidAuctionDataError();
    }
    return latestBidPrice;
  }

  getNextBidPrice(auction: Auction): number {
    const latestBidPrice = this.getLatestBidPriceForAuction(auction);
    return latestBidPrice * (1 + BID_RAISE_PERCENT / 100);
  }
}

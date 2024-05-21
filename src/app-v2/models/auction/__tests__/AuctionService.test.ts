import {Auction} from '../../../api/auctions/types';
import {AuctionService} from '../AuctionService';
import {InvalidAuctionDataError} from '../errors/InvalidAuctionDataError';

describe('AuctionService', () => {
  it('returns starting price if auction has no bids', () => {
    const service = new AuctionService();
    const auction: Auction = {
      price: 10,
      sellerWalletAddress: 'address',
      nftId: 'id',
      bids: [],
    };
    expect(service.getLatestBidPriceForAuction(auction)).toEqual(10);
  });

  it('returns latest bid price', () => {
    const service = new AuctionService();
    const auction: Auction = {
      price: 10,
      sellerWalletAddress: 'address',
      nftId: 'id',
      bids: [
        {price: 20, buyerWalletAddress: 'buyer', timestamp: 'time'},
        {price: 12, buyerWalletAddress: 'buyer', timestamp: 'time'},
      ],
    };
    expect(service.getLatestBidPriceForAuction(auction)).toEqual(20);
  });

  it('throws an error if no price data available', () => {
    const service = new AuctionService();
    const auction: Auction = {
      sellerWalletAddress: 'address',
      nftId: 'id',
    } as any;
    expect(() => service.getLatestBidPriceForAuction(auction)).toThrow(InvalidAuctionDataError);
  });

  it('returns next bid price', () => {
    const service = new AuctionService();
    const auction: Auction = {
      price: 10,
      sellerWalletAddress: 'address',
      nftId: 'id',
      bids: [
        {price: 20, buyerWalletAddress: 'buyer', timestamp: 'time'},
        {price: 12, buyerWalletAddress: 'buyer', timestamp: 'time'},
      ],
    };
    expect(service.getNextBidPrice(auction)).toEqual(22);
  });
});

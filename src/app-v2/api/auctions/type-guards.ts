import {AuctionRawData} from './types';

export const isAuctionRawData = (data: any): data is AuctionRawData =>
  typeof data?.seller === 'string' &&
  typeof data?.price === 'number' &&
  Array.isArray(data?.creator_auction_bids) &&
  data?.creator_auction_bids?.every(
    (bid: any) =>
      typeof bid?.buyer === 'string' && typeof bid?.price === 'number' && typeof bid?.timestamp === 'string',
  );

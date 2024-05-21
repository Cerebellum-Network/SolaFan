import {Numberish} from '../numberish';
import {CreatorAuctionBid} from './creator-auction-bid';

export type CreatorAuction = {
  id: Numberish;
  seller: string;
  buyer: string;
  price: number;
  ends_at: string;
  published_at: string;
  is_settled: boolean;
  bids: CreatorAuctionBid[];
};

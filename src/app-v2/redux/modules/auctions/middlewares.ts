import {AnyAction, MiddlewareAPI} from 'redux';

import {IAuctionsApi} from '../../../api/auctions/IAuctionsApi';
import {AuctionService} from '../../../models/auction/AuctionService';
import {IAuctionSCApi} from '../../../models/auction/IAuctionSCApi';
import {selectNftById} from '../nfts/selectors';
import {ShowNFTSellFailedModalCommand, ShowNFTSellSuccessModalCommand} from '../selling/actions';
import {
  CreateAuctionCommand,
  CreateAuctionFailedEvent,
  CreateAuctionSuccessEvent,
  PlaceBidCommand,
  PlaceBidFailedEvent,
  PlaceBidSuccessEvent,
  SettleAuctionCommand,
  SettleAuctionFailedEvent,
  SettleAuctionSuccessEvent,
  ShowBidFailedModalCommand,
  ShowBidModalCommand,
  ShowBidSuccessModalCommand,
  StartBidFlowCommand,
} from './actions';

export const startNftBidFlowMiddleware =
  (auctionsApi: IAuctionsApi, auctionService: AuctionService) =>
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === StartBidFlowCommand.type) {
      const {nftId, sellerWalletAddress} = action.payload;
      try {
        const auction = await auctionsApi.getOpenedAuctionForNftAndSeller(nftId, sellerWalletAddress);
        if (!auction) {
          dispatch(PlaceBidFailedEvent.create(nftId, 'Auction not found'));
          return;
        }
        const minBidPrice = auctionService.getNextBidPrice(auction);
        dispatch(ShowBidModalCommand.create(nftId, minBidPrice, sellerWalletAddress));
      } catch (e) {
        dispatch(PlaceBidFailedEvent.create(nftId, e.message));
      }
    }
  };

export const placeBidMiddleware =
  (auctionSCApi: IAuctionSCApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === PlaceBidCommand.type) {
      const {nftId, auctionId, price, sellerWalletAddress} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(PlaceBidFailedEvent.create(nftId, 'NFT data not found'));
        return;
      }
      try {
        await auctionSCApi.placeBid(auctionId, price);
        dispatch(PlaceBidSuccessEvent.create(nftId, price));
        dispatch(ShowBidSuccessModalCommand.create(nftId, price));
      } catch (e) {
        dispatch(PlaceBidFailedEvent.create(nftId, e.message));
        dispatch(ShowBidFailedModalCommand.create(nftId, price, sellerWalletAddress, e.message));
      }
    }
  };

export const createAuctionMiddleware =
  (auctionSCApi: IAuctionSCApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === CreateAuctionCommand.type) {
      const {nftId, amount, startingPrice, duration} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(CreateAuctionFailedEvent.create(nftId, 'NFT data not found'));
        return;
      }
      try {
        await auctionSCApi.startAuction(nft.address, startingPrice, amount, duration, nft.collectionAddress!);
        dispatch(CreateAuctionSuccessEvent.create(nftId));
        dispatch(ShowNFTSellSuccessModalCommand.create(nftId, startingPrice, 1));
      } catch (e) {
        dispatch(CreateAuctionFailedEvent.create(nftId, e.message));
        dispatch(ShowNFTSellFailedModalCommand.create(nftId, startingPrice, 1));
      }
    }
  };

export const settleActionMiddleware =
  (auctionSCApi: IAuctionSCApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === SettleAuctionCommand.type) {
      const {nftId, auctionId} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(SettleAuctionFailedEvent.create(nftId, 'NFT data not found'));
        return;
      }
      try {
        await auctionSCApi.settleAuction(auctionId);
        dispatch(SettleAuctionSuccessEvent.create(nftId));
      } catch (e) {
        dispatch(SettleAuctionFailedEvent.create(nftId, e.message));
      }
    }
  };

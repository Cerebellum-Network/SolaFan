import {AnyAction, MiddlewareAPI} from 'redux';

import {NftsApi} from '../../../api/nfts/NftsApi';
import {ISellNftApi} from '../../../models/selling/ISellNftApi';
import {selectCurrentLocale} from '../localization/selectors';
import {CloseActiveModalCommand} from '../modals/actions';
import {ResetNftPageLoadingStateCommand, UpdateNftDataCommand} from '../nft-page/actions';
import {NftDocument} from '../nfts/actions';
import {selectNftById} from '../nfts/selectors';
import {
  CancelNFTSellingCommand,
  CancelNFTSellingFailedEvent,
  CancelNFTSellingSuccessEvent,
  NFTSellFailedEvent,
  NFTSellSuccessEvent,
  SellNFTCommand,
  ShowNFTSellFailedModalCommand,
  ShowNFTSellingCancelFailedModalCommand,
  ShowNFTSellingCancelSuccessModalCommand,
  ShowNFTSellSuccessModalCommand,
  ShowSellNFTModalCommand,
  StartNFTSellingCommand,
} from './actions';

export const startNftSellingMiddleware =
  (nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === StartNFTSellingCommand.type) {
      const nftId = action.payload;
      const state = getState();
      const nft = selectNftById(state, nftId);
      const locale = selectCurrentLocale(state);
      if (!nft) {
        try {
          const loadedNft = await nftApi.getNftById(nftId, locale);
          dispatch(NftDocument.create(loadedNft));
        } catch (e) {
          console.error(e);
          dispatch(NFTSellFailedEvent.create(nftId, e.message));
          return;
        }
      }
      dispatch(ShowSellNFTModalCommand.create(nftId));
    }
  };

export const sellNftMiddleware =
  (sellApi: ISellNftApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === SellNFTCommand.type) {
      const {nftId, price, amount} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(NFTSellFailedEvent.create(nftId, `Cannot find nft data`));
        return;
      }
      try {
        await sellApi.sellNft(nft.address, price, amount, nft.collectionAddress!);
        dispatch(NFTSellSuccessEvent.create());
        dispatch(ShowNFTSellSuccessModalCommand.create(nftId, price, amount));
        dispatch(UpdateNftDataCommand.create(nftId, 5000));
      } catch (e) {
        console.error(e);
        dispatch(NFTSellFailedEvent.create(nftId, e.message));
        dispatch(ShowNFTSellFailedModalCommand.create(nftId, price, amount));
      }
    }
  };

export const cancelNftSellingMiddleware =
  (sellApi: ISellNftApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === CancelNFTSellingCommand.type) {
      const {nftId, orderId} = action.payload;
      const nft = selectNftById(getState(), nftId);
      if (!nft) {
        dispatch(CancelNFTSellingFailedEvent.create(nftId, 'Cannot find nft data'));
        return;
      }

      try {
        await sellApi.cancelNftSelling(orderId);
        dispatch(CancelNFTSellingSuccessEvent.create());
        dispatch(ShowNFTSellingCancelSuccessModalCommand.create());
        dispatch(CloseActiveModalCommand.create());
        dispatch(ResetNftPageLoadingStateCommand.create());
        dispatch(UpdateNftDataCommand.create(nftId, 5000));
      } catch (e) {
        console.error(e);
        dispatch(CancelNFTSellingFailedEvent.create(nftId, e.message));
        dispatch(ShowNFTSellingCancelFailedModalCommand.create(e.message));
        dispatch(CloseActiveModalCommand.create());
      }
    }
  };

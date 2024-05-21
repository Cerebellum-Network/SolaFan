import {NftCardInterface} from '@cere/services-types';
import {AnyAction, MiddlewareAPI} from 'redux';

import {NftsApi} from '../../../api/nfts/NftsApi';
import {selectCurrentLocale} from '../localization/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../wallets/selectors';
import {LoadNftByIdCommand, LoadNftsArrayByIdsCommand, NftDocument, NftsDocument, UpdateNftCommand} from './actions';
import {selectNftById} from './selectors';

export const updateNftMiddleware =
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === UpdateNftCommand.type) {
      const {id, partialNftData} = action.payload;
      const nft = selectNftById(getState(), id);
      if (!nft) {
        return;
      }
      dispatch(NftDocument.create({...nft, ...partialNftData}));
    }
  };

export const loadNftByIdMiddleware =
  (nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadNftByIdCommand.type) {
      const nftId = action.payload;
      const nft = selectNftById(getState(), nftId);
      const locale = selectCurrentLocale(getState());
      if (nft) {
        return;
      }
      const data = await nftApi.getNftById(nftId, locale);
      dispatch(NftDocument.create(data));
    }
  };

export const loadArrayNftsByIdsMiddleware =
  (nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadNftsArrayByIdsCommand.type) {
      const nftIds = action.payload;
      const locale = selectCurrentLocale(getState());
      const activeWalletType = selectActiveWalletType(getState());
      const walletPublicKey = selectWalletAddress(getState(), activeWalletType)?.toLowerCase();
      const data = await nftApi.getAllNfts({ids: nftIds || [], locale, walletAddress: walletPublicKey});
      if (data.length > 0) {
        dispatch(NftsDocument.create(data as NftCardInterface[]));
      }
    }
  };

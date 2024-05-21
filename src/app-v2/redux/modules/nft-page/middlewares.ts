import {AnyAction, MiddlewareAPI} from 'redux';

import analyticService, {AnalyticEventsEnum} from '../../../../shared/services/analytic.service';
import {exhibitApi} from '../../../api';
import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {NftsApi} from '../../../api/nfts/NftsApi';
import {IOrdersApi} from '../../../api/orders/IOrdersApi';
import {ITransfersApi} from '../../../api/transfers/ITransfersApi';
import {UsersNftCardInterface} from '../../../types/nft';
import {CreatorDocument} from '../creators';
import {selectCreatorById} from '../creators/selectors';
import {ExhibitDocument} from '../exhibits/actions';
import {selectExhibitsBySlugs} from '../exhibits/selectors';
import {selectCurrentLocale} from '../localization/selectors';
import {NftDocument, UpdateNftCommand} from '../nfts/actions';
import {selectNftById} from '../nfts/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../wallets/selectors';
import {LoadNftTransfersCommand, TransferDocument} from './actions';
import {
  LoadNftPageDataCommand,
  NftDataLoadedEvent,
  NftListingsLoadedEvent,
  NftListingsLoadingFailedEvent,
  NftOrdersDocument,
  NftPageDataLoadingFailedEvent,
  ResetNftPageLoadingStateCommand,
  SubscribeToCreatorDrops,
  UpdateNftDataCommand,
} from './actions';
import {selectNftTransfers} from './selectors';

export const loadNftPageDataMiddleware =
  (nftsApi: NftsApi, creatorsApi: ICreatorsApi, ordersApi: IOrdersApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadNftPageDataCommand.type) {
      const state = getState();
      const {nftId} = action.payload;
      dispatch(ResetNftPageLoadingStateCommand.create());

      const locale = selectCurrentLocale(state);
      const activeWalletType = selectActiveWalletType(state);
      const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
      let nft = selectNftById(state, nftId);
      if (nft == null) {
        try {
          nft = (await nftsApi.getNftById(nftId, locale, walletPublicKey)) as UsersNftCardInterface | undefined;
          if (!nft) {
            throw new Error(`NFT with id ${nftId} not found.`);
          }
          dispatch(NftDocument.create(nft));
        } catch (e) {
          console.error(e.message);
          dispatch(NftPageDataLoadingFailedEvent.create());
          return;
        }
      }

      let creator = selectCreatorById(state, nft.creatorId);
      if (creator == null) {
        try {
          creator = await creatorsApi.getCreatorById(nft.creatorId, locale);
          if (!creator) {
            throw new Error(`Creator with id ${nft.creatorId} not found.`);
          }
          dispatch(CreatorDocument.create(creator));
          dispatch(NftDataLoadedEvent.create());
        } catch (e) {
          console.error(e);
          dispatch(NftPageDataLoadingFailedEvent.create());
          return;
        }
      }

      let unlockingEvents = selectExhibitsBySlugs(state, nft.unlockingEventsSlugs);
      if (unlockingEvents.length !== nft.unlockingEventsSlugs.length) {
        try {
          await Promise.all(
            nft.unlockingEventsSlugs.map((slug) =>
              exhibitApi.getEvent(slug, false, locale).then((exhibit) => {
                if (exhibit) {
                  dispatch(ExhibitDocument.create(exhibit));
                }
              }),
            ),
          );
        } catch (e) {
          console.error(e);
          return;
        }
      }

      dispatch(NftDataLoadedEvent.create());

      try {
        const activeWalletType = selectActiveWalletType(state);
        const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
        if (!walletPublicKey) return;
        const orders = await ordersApi.loadNftOrders(nft.collectionAddress!, nft.address, walletPublicKey);
        if (!orders) return;
        dispatch(NftOrdersDocument.create(orders));
        dispatch(NftListingsLoadedEvent.create());
      } catch (e) {
        console.error(e);
        dispatch(NftListingsLoadingFailedEvent.create());
      }
    }
  };

export const updateNftDataMiddleware =
  (nftsApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === UpdateNftDataCommand.type) {
      const {nftId, delay} = action.payload;
      if (delay) {
        await new Promise((resolve) => setTimeout(() => resolve(true), delay));
      }
      const state = getState();
      try {
        const locale = selectCurrentLocale(state);
        const {id, ...partialNftData} = await nftsApi.getNftById(nftId, locale);
        dispatch(UpdateNftCommand.create(nftId, partialNftData));
      } catch (error) {
        console.error(error);
      }
    }
  };

export const subscribeToCreatorDropsMiddleware = () => () => (next: Function) => async (action: AnyAction) => {
  next(action);
  if (action.type === SubscribeToCreatorDrops.type) {
    // TODO call api
    analyticService.gtmTrack(AnalyticEventsEnum.STAY_UPDATED_SUBSCRIPTION);
  }
};

export const loadNftTransfers =
  (transfersApi: ITransfersApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadNftTransfersCommand.type) {
      const {collectionAddress, nftId} = action.payload;
      const transfers = selectNftTransfers(getState());
      if (transfers.length > 0) {
        return;
      }
      const data = await transfersApi.getNftTransfers(collectionAddress, nftId);
      if (!data) {
        return;
      }
      dispatch(TransferDocument.create(data));
    }
  };

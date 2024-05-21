import {AnyAction, MiddlewareAPI} from 'redux';

import {ICreatorApi} from '../../../api/creator/ICreatorApi';
import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {NftsApi} from '../../../api/nfts/NftsApi';
import {CreatorDocument} from '../creators';
import {selectCreatorById} from '../creators/selectors';
import {selectCurrentLocale} from '../localization/selectors';
import {
  CreatorExhibitsDocument,
  CreatorExhibitsLoadedEvent,
  CreatorExhibitsLoadingFailedEvent,
  CreatorLoadedEvent,
  CreatorLoadingEvent,
  CreatorLoadingFailedEvent,
  CreatorNftsDocument,
  CreatorNftsLoadedEvent,
  CreatorNftsLoadingFailedEvent,
  CreatorsDocument,
  CreatorsFeaturedFailedEvent,
  CreatorsLoadedEvent,
  CreatorsLoadingEvent,
  LoadCreatorPageDataCommand,
  ResetCreatorPageLoadingStateCommand,
} from './actions';

export const loadCreatorPageDataMiddleware =
  (creatorApi: ICreatorApi, creatorsApi: ICreatorsApi, nftApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    if (action.type === LoadCreatorPageDataCommand.type) {
      const state = getState();
      const locale = selectCurrentLocale(state);
      const {creatorId} = action.payload;
      dispatch(ResetCreatorPageLoadingStateCommand.create());
      creatorApi
        .getExhibitsByCreatorId(creatorId, locale)
        .then((exhibits) => {
          dispatch(CreatorExhibitsDocument.create(exhibits));
          dispatch(CreatorExhibitsLoadedEvent.create());
        })
        .catch((e) => {
          console.error(e.message);
          dispatch(CreatorExhibitsLoadingFailedEvent.create());
          return;
        });
      nftApi
        .getAllNfts({creatorId, locale})
        .then((nfts) => {
          dispatch(CreatorNftsDocument.create(nfts));
          dispatch(CreatorNftsLoadedEvent.create());
        })
        .catch((e) => {
          console.error(e);
          dispatch(CreatorNftsLoadingFailedEvent.create());
          return;
        });
      dispatch(CreatorsLoadingEvent.create());
      creatorsApi
        .getAllCreators(locale)
        .then((creators) => {
          dispatch(CreatorsDocument.create(creators));
          dispatch(CreatorsLoadedEvent.create());
        })
        .catch(() => {
          dispatch(CreatorsFeaturedFailedEvent.create());
        });
      let creator = selectCreatorById(state, creatorId);
      if (!creator) {
        dispatch(CreatorLoadingEvent.create());
        try {
          creator = await creatorsApi.getCreatorById(creatorId, locale);
          if (!creator) {
            throw new Error();
          }
          dispatch(CreatorDocument.create(creator));
          dispatch(CreatorLoadedEvent.create());
        } catch (e) {
          console.error(e.message);
          dispatch(CreatorLoadingFailedEvent.create());
          return;
        }
      } else {
        dispatch(CreatorLoadedEvent.create());
      }
    }
  };

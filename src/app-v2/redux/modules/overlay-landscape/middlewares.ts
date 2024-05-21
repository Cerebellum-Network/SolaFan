import {AnyAction, MiddlewareAPI} from 'redux';

import {IOverlayApi} from '../../../api/overlay-nfts/IOverlayApi';
import {selectCurrentLocale} from '../localization/selectors';
import {FetchOverlayFinishedEvent, FetchOverlayStartedEvent, OverlayNftsCommand, OverlayNftsDocument} from './actions';

export const overlayMiddleware =
  (overlayApi: IOverlayApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  async (action: AnyAction) => {
    next(action);
    const locale = selectCurrentLocale(getState());
    if (action.type === OverlayNftsCommand.type) {
      const {slug} = action.payload;
      try {
        dispatch(FetchOverlayStartedEvent.create());
        const nfts = await overlayApi.getNfts(slug, locale);
        dispatch(OverlayNftsDocument.create(nfts));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(FetchOverlayFinishedEvent.create());
      }
    }
  };

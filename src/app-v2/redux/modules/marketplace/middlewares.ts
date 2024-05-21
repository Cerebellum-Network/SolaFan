import {AnyAction, MiddlewareAPI} from 'redux';

import {NftsApi} from '../../../api/nfts/NftsApi';
import {selectCurrentLocale} from '../localization/selectors';
import {NftsDocument} from '../nfts/actions';
import {
  LoadMarketplaceDataCommand,
  MarketplaceFeaturedNftsDocument,
  MarketplaceFeaturedNftsLoadingFailedEvent,
  MarketplaceSecondaryNftsDocument,
  MarketplaceSecondaryNftsLoadingFailedEvent,
} from './actions';

export const loadMarketplaceDataMiddleware =
  (nftsApi: NftsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);

    if (action.type === LoadMarketplaceDataCommand.type) {
      const locale = selectCurrentLocale(getState());
      nftsApi
        .getSecondaryFeaturedNfts(locale)
        .then((nfts) => {
          dispatch(NftsDocument.create(nfts));
          dispatch(MarketplaceFeaturedNftsDocument.create(nfts));
        })
        .catch((error) => dispatch(MarketplaceFeaturedNftsLoadingFailedEvent.create(error.message)));
      nftsApi
        .getSecondaryNfts({locale})
        .then((nfts) => {
          dispatch(NftsDocument.create(nfts));
          dispatch(MarketplaceSecondaryNftsDocument.create(nfts));
        })
        .catch((error) => dispatch(MarketplaceSecondaryNftsLoadingFailedEvent.create(error.message)));
    }
  };

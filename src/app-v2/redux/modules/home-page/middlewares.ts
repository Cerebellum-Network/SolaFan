import {AnyAction, MiddlewareAPI} from 'redux';

import {ICreatorsApi} from '../../../api/creators/ICreatorsApi';
import {IEventsApi} from '../../../api/events/IEventsApi';
import {IHomePageNftsApi} from '../../../api/home-page/IHomePageNftsApi';
import {selectUserEmail} from '../auth/selectors';
import {selectCurrentLocale} from '../localization/selectors';
import {RedirectCommand} from '../navigation/actions';
import {NftsDocument} from '../nfts/actions';
import {WalletConnectedEvent, WalletDisconnectedEvent} from '../wallets';
import {
  BannerItemsDocument,
  BannerItemsLoadingFailedEvent,
  ConnectWalletClickEvent,
  FeaturedCreatorsDocument,
  FeaturedCreatorsLoadingFailedEvent,
  FeaturedEventsDocument,
  FeaturedEventsLoadingFailedEvent,
  FeaturedNftsDocument,
  FeaturedNftsLoadingFailedEvent,
  LoadHomePageDataCommand,
  NftCollectablesDocument,
  NftsCollectablesLoadingFailedEvent,
  SellNftsClickEvent,
  ShowConnectYourWalletDialogCommand,
} from './actions';

export const loadHomePageDataMiddleware =
  (homePageNftsApi: IHomePageNftsApi, creatorsApi: ICreatorsApi, eventsApi: IEventsApi) =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    if (action.type === LoadHomePageDataCommand.type) {
      const locale = selectCurrentLocale(getState());
      homePageNftsApi
        .getPageNfts({locale})
        .then((nfts) => {
          dispatch(NftsDocument.create(nfts));
          dispatch(NftCollectablesDocument.create(nfts));
        })
        .catch((error) => dispatch(NftsCollectablesLoadingFailedEvent.create(error.message)));
      homePageNftsApi
        .getFeaturedNfts(locale)
        .then((nfts) => {
          dispatch(NftsDocument.create(nfts));
          dispatch(FeaturedNftsDocument.create(nfts));
        })
        .catch((error) => dispatch(FeaturedNftsLoadingFailedEvent.create(error.message)));
      homePageNftsApi
        .getBannerItems()
        .then((items) => {
          dispatch(BannerItemsDocument.create(items));
        })
        .catch((error) => dispatch(BannerItemsLoadingFailedEvent.create(error.message)));
      creatorsApi
        .getFeaturedCreators(locale)
        .then((creators) => dispatch(FeaturedCreatorsDocument.create(creators)))
        .catch((error) => dispatch(FeaturedCreatorsLoadingFailedEvent.create(error.message)));
      eventsApi
        .getFeaturedEvents(locale)
        .then((events) => dispatch(FeaturedEventsDocument.create(events)))
        .catch((error) => dispatch(FeaturedEventsLoadingFailedEvent.create(error.message)));
    }
  };

export const getStartedEventsMiddleware =
  () =>
  ({dispatch, getState}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    const state = getState();
    const locale = selectCurrentLocale(state);
    const isUserAuth = Boolean(selectUserEmail(state));

    switch (action.type) {
      case SellNftsClickEvent.type:
        dispatch(RedirectCommand.create(`/${locale}/home/user/nfts`));
        break;
      case ConnectWalletClickEvent.type:
        if (isUserAuth) {
          dispatch(ShowConnectYourWalletDialogCommand.create());
        } else {
          dispatch(RedirectCommand.create(`/${locale}/home/auth/signin`));
        }
        break;
    }
  };

export const invalidateHomePageNftsMiddleware =
  ({dispatch}: MiddlewareAPI) =>
  (next: Function) =>
  (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case WalletConnectedEvent.type:
      case WalletDisconnectedEvent.type:
        dispatch(LoadHomePageDataCommand.create());
        break;
    }
  };

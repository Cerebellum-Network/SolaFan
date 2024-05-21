import {ExhibitCardInterface, FullCreatorInterface} from '@cere/services-types';

import {BannerItem} from '../../../api/home-page/types';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {HOME_PAGE_MODULE_NAME} from './constants';
import {LoadingState} from './reducers';
import {HomePageStore} from './types';

export const selectHomePageData = (state: HomePageStore) => {
  if (!state[HOME_PAGE_MODULE_NAME]) {
    throw new NoSuchModuleError(HOME_PAGE_MODULE_NAME);
  }
  return state[HOME_PAGE_MODULE_NAME];
};

export const selectCollectableNftsIds = (state: HomePageStore): string[] => {
  return selectHomePageData(state).collectables;
};

export const selectFeaturedNftsIds = (state: HomePageStore): string[] => {
  return selectHomePageData(state).featuredNfts;
};

export const selectBannerItems = (state: HomePageStore): BannerItem[] => {
  return selectHomePageData(state).bannerItems;
};

export const selectFeaturedCreators = (state: HomePageStore): FullCreatorInterface[] => {
  return selectHomePageData(state).featuredCreators;
};

export const selectFeaturedEvents = (state: HomePageStore): ExhibitCardInterface[] => {
  return selectHomePageData(state).featuredEvents;
};

export const selectHomePageLoadingState = (state: HomePageStore): LoadingState => {
  return selectHomePageData(state).loadingState;
};

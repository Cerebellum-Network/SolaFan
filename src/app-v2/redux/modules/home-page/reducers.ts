import {ExhibitCardInterface, FullCreatorInterface, NftCardInterface} from '@cere/services-types';
import {AnyAction, combineReducers} from 'redux';

import {BannerItem} from '../../../api/home-page/types';
import {
  BannerItemsDocument,
  FeaturedCreatorsDocument,
  FeaturedEventsDocument,
  FeaturedNftsDocument,
  NftCollectablesDocument,
} from './actions';

export type LoadingState = {
  collectablesLoading: boolean;
  featuredLoading: boolean;
  bannerLoading: boolean;
  creatorsLoading: boolean;
  eventsLoading: boolean;
};

const defaultLoadingState: LoadingState = {
  collectablesLoading: true,
  featuredLoading: true,
  bannerLoading: true,
  creatorsLoading: true,
  eventsLoading: true,
};

export const loadingStateReducer = (state: LoadingState = defaultLoadingState, action: AnyAction): LoadingState => {
  switch (action.type) {
    case NftCollectablesDocument.type:
      return {
        ...state,
        collectablesLoading: false,
      };
    case FeaturedNftsDocument.type:
      return {
        ...state,
        featuredLoading: false,
      };
    case BannerItemsDocument.type:
      return {
        ...state,
        bannerLoading: false,
      };
    case FeaturedCreatorsDocument.type:
      return {
        ...state,
        creatorsLoading: false,
      };
    case FeaturedEventsDocument.type:
      return {
        ...state,
        eventsLoading: false,
      };
    default:
      return state;
  }
};

export const homePageNftCollectablesReducer = (state: string[] = [], action: AnyAction): string[] => {
  if (action.type === NftCollectablesDocument.type) {
    return (action.payload as NftCardInterface[]).map((nft) => nft.id);
  }
  return state;
};

export const featuredNftsReducer = (state: string[] = [], action: AnyAction): string[] => {
  if (action.type === FeaturedNftsDocument.type) {
    return (action.payload as NftCardInterface[]).map((nft) => nft.id);
  }
  return state;
};

export const bannerItemsReducer = (state: BannerItem[] = [], action: AnyAction): BannerItem[] => {
  if (action.type === BannerItemsDocument.type) {
    return action.payload;
  }
  return state;
};

export const featuredCreatorsReducer = (state: FullCreatorInterface[] = [], action: AnyAction) => {
  if (action.type === FeaturedCreatorsDocument.type) {
    return action.payload;
  }
  return state;
};

export const featuredEventsReducer = (state: ExhibitCardInterface[] = [], action: AnyAction) => {
  if (action.type === FeaturedEventsDocument.type) {
    return action.payload;
  }
  return state;
};

export const homePageModuleReducer = combineReducers({
  collectables: homePageNftCollectablesReducer,
  featuredNfts: featuredNftsReducer,
  bannerItems: bannerItemsReducer,
  featuredCreators: featuredCreatorsReducer,
  featuredEvents: featuredEventsReducer,
  loadingState: loadingStateReducer,
});

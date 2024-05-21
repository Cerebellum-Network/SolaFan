import {NftCardInterface} from '@cere/services-types';
import {AnyAction, combineReducers} from 'redux';

import {
  MarketplaceFeaturedNftsDocument,
  MarketplaceFeaturedNftsLoadingFailedEvent,
  MarketplaceSecondaryNftsDocument,
  MarketplaceSecondaryNftsLoadingFailedEvent,
} from './actions';

type LoadingState = {
  featuredNftsLoading: boolean;
  collectableNftsLoading: boolean;
};

const defaultLoadingState: LoadingState = {
  featuredNftsLoading: true,
  collectableNftsLoading: true,
};

export const marketplaceLoadingStateReducer = (
  state: LoadingState = defaultLoadingState,
  action: AnyAction,
): LoadingState => {
  switch (action.type) {
    case MarketplaceFeaturedNftsDocument.type:
    case MarketplaceFeaturedNftsLoadingFailedEvent.type:
      return {
        ...state,
        featuredNftsLoading: false,
      };
    case MarketplaceSecondaryNftsDocument.type:
    case MarketplaceSecondaryNftsLoadingFailedEvent:
      return {
        ...state,
        collectableNftsLoading: false,
      };
    default:
      return state;
  }
};

export const marketplaceFeaturedNftsReducer = (state: string[] = [], action: AnyAction): string[] => {
  if (action.type === MarketplaceFeaturedNftsDocument.type) {
    return (action.payload as NftCardInterface[]).map((nft) => nft.id);
  }
  return state;
};

export const marketplaceNftCollectablesReducer = (state: string[] = [], action: AnyAction): string[] => {
  if (action.type === MarketplaceSecondaryNftsDocument.type) {
    return (action.payload as NftCardInterface[]).map((nft) => nft.id);
  }
  return state;
};

export const marketplaceModuleReducer = combineReducers({
  featuredNftIds: marketplaceFeaturedNftsReducer,
  collectableNftIds: marketplaceNftCollectablesReducer,
  loadingState: marketplaceLoadingStateReducer,
});

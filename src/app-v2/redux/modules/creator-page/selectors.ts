import {ExhibitCardInterface} from '@cere/services-types/dist/types';

import {Nft} from '../../../api/creator/types';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {CREATOR_PAGE_MODULE_NAME} from './constants';
import {CreatorDetailsPageStore} from './types';

export const selectCreatorDetailsPageData = (state: CreatorDetailsPageStore) => {
  if (!state[CREATOR_PAGE_MODULE_NAME]) {
    throw new NoSuchModuleError(CREATOR_PAGE_MODULE_NAME);
  }
  return state[CREATOR_PAGE_MODULE_NAME];
};

export const selectCreatorExhibits = (state: CreatorDetailsPageStore): ExhibitCardInterface[] => {
  return selectCreatorDetailsPageData(state).exhibits;
};

export const selectCreatorExhibitsSlugs = (state: CreatorDetailsPageStore): string[] => {
  return selectCreatorExhibits(state).map(({slug}) => slug);
};

export const selectCreatorNfts = (state: CreatorDetailsPageStore): Nft[] => {
  return selectCreatorDetailsPageData(state).nfts;
};

export const selectCreators = (state: CreatorDetailsPageStore) => {
  return selectCreatorDetailsPageData(state).creators;
};

export const selectCreatorDetailsPageLoadingState = (state: CreatorDetailsPageStore) => {
  return selectCreatorDetailsPageData(state).loadingState;
};

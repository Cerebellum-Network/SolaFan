import {ExhibitCardInterface, ExhibitionStatus} from '@cere/services-types';
import {createSelector} from 'reselect';

import {CmsExhibit} from '../../../types/exhibit';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {EXHIBITS_PAGE_MODULE_NAME} from './constants';
import {ExhibitsPageStore} from './types';

export const selectExhibitsPageData = (store: ExhibitsPageStore) => {
  if (!store[EXHIBITS_PAGE_MODULE_NAME]) {
    throw new NoSuchModuleError(EXHIBITS_PAGE_MODULE_NAME);
  }
  return store[EXHIBITS_PAGE_MODULE_NAME];
};

export const selectExhibitsPage = (store: ExhibitsPageStore) => selectExhibitsPageData(store).exhibits;
export const selectExhibitsLoadingState = (store: ExhibitsPageStore) => selectExhibitsPageData(store).exhibitsLoading;
export const selectExhibitsSeo = (store: ExhibitsPageStore) => selectExhibitsPageData(store).exhibitsSeo[0];
export const selectExhibitById = (store: ExhibitsPageStore, exhibitId: string): CmsExhibit =>
  selectExhibitsPageData(store).exhibits.find((exhibit: ExhibitCardInterface) => exhibit.id === exhibitId);

export const selectExhibitions = createSelector(
  selectExhibitsPageData,
  (exhibitsPage): CmsExhibit[] => exhibitsPage.exhibits as any,
);

export const selectExhibitionsFilter = createSelector(
  selectExhibitsPageData,
  (exhibitsPage): ExhibitionStatus => (exhibitsPage.exhibitsFilter as any) ?? [],
);

import {createSelector} from 'reselect';

import {CmsExhibit} from '../../../types/exhibit';
import {UsersNftCardInterface} from '../../../types/nft';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {selectNfts as selectExistedNfts} from '../nfts/selectors';
import {EXHIBIT_MODULE_NAME} from './constants';
import {ExhibitModuleStoreType} from './types';

export const selectEvent = (store: ExhibitModuleStoreType) => {
  if (!store[EXHIBIT_MODULE_NAME]) {
    throw new NoSuchModuleError(EXHIBIT_MODULE_NAME);
  }
  return store[EXHIBIT_MODULE_NAME].event;
};

export const selectEventLoading = (store: ExhibitModuleStoreType): boolean => {
  return store[EXHIBIT_MODULE_NAME].eventLoading;
};

export const selectMoreExhibits = (store: ExhibitModuleStoreType, exclude?: string[]): CmsExhibit[] => {
  if (!store[EXHIBIT_MODULE_NAME]) {
    throw new NoSuchModuleError(EXHIBIT_MODULE_NAME);
  }
  if (!exclude) {
    return store[EXHIBIT_MODULE_NAME].exhibits as CmsExhibit[];
  }

  return (store[EXHIBIT_MODULE_NAME].exhibits as any[]).filter((exhibit: any) => !exclude.includes(String(exhibit.id)));
};

export const createSelectExhibitNfts = () =>
  createSelector([selectExistedNfts, (_, ids: string[] | undefined) => ids], (nfts, ids) => {
    return (
      ids ? Object.values(nfts).filter((nft) => nft && ids.includes(nft?.id)) : Object.values(nfts)
    ) as UsersNftCardInterface[];
  });

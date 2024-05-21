import {createSelector} from 'reselect';

import {UsersNftCardInterface} from '../../../types/nft';
import {NoSuchModuleError} from '../../base/NoSuchModuleError';
import {NFTS_MODULE_NAME} from './constants';
import {NftsStore} from './types';

export const selectNfts = (store: NftsStore) => {
  if (!store[NFTS_MODULE_NAME]) {
    throw new NoSuchModuleError(NFTS_MODULE_NAME);
  }
  return store[NFTS_MODULE_NAME].nfts;
};

const selectProps = (_: NftsStore, props: Record<'cmsNftId', string | number>) => props;

export const selectNftById = (store: NftsStore, id: string) => selectNfts(store)[id];

export const selectNftByIds = (store: NftsStore, ids: string[]) =>
  Object.values(selectNfts(store)).filter((nft) => nft?.id && ids.includes(nft.id)) as UsersNftCardInterface[];

export const selectNftByCmsNftId = createSelector(selectNfts, selectProps, (state, {cmsNftId}) => state[cmsNftId]);

export const selectNftsByExhibitSlugs = (store: NftsStore, slug: string) =>
  Object.values(selectNfts(store)).filter((nft) => nft?.exhibitionSlug === slug) as UsersNftCardInterface[];

export const selectNftsByArtist = (store: NftsStore, creatorId?: string) =>
  Object.values(selectNfts(store)).filter((nft) => nft?.creatorId === creatorId) as UsersNftCardInterface[];

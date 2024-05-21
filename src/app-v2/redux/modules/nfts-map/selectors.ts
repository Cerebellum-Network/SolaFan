import {createSelector} from 'reselect';

import {reducer} from './reducer';

type Branch = ReturnType<typeof reducer>;

type Store = {'nfts-map': Branch};

export const getNftsMapRoot = (state: Store) => state['nfts-map'];

export const getNftId = (_state: Store, {nftId}: {nftId: string}) => nftId;

export const getNft = createSelector(getNftsMapRoot, getNftId, (state: Branch, nftId: string) => state[nftId]);

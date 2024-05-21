import {createAction} from 'redux-actions';

import {GenericNft, Payload} from './types';

export const loadNfts = createAction<Payload, GenericNft[]>('NFTS-MAP/loadNfts', (nfts: GenericNft[]) => nfts);

export const loadNft = createAction<Payload, GenericNft>('NFTS-MAP/loadNft', (nft: GenericNft) => [nft]);

export const unloadNft = createAction<Payload, string>('NFTS-MAP/unloadNft', (id: string) => [{id}]);

export const unloadNfts = createAction<Payload, string[]>('NFTS-MAP/unloadNfts', (ids: string[]) =>
  ids.map((id) => ({id})),
);

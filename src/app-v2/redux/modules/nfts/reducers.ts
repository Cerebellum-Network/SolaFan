import {AnyAction} from 'redux';

import {UsersNftCardInterface} from '../../../types/nft';
import {NftDocument, NftsDocument} from './actions';

type NormalizedNftsStore = {
  ids: string[];
  nfts: {[key: string]: UsersNftCardInterface | undefined};
};

const defaultState = {
  ids: [],
  nfts: {},
};

export const allNftsReducer = (store: NormalizedNftsStore = defaultState, action: AnyAction): NormalizedNftsStore => {
  switch (action.type) {
    case NftDocument.type: {
      const ids = store.ids;
      const nfts = store.nfts;
      const nft: UsersNftCardInterface = action.payload;
      if (!ids.includes(nft.id)) {
        ids.push(nft.id);
      }
      nfts[nft.id] = nft;
      return {
        nfts,
        ids,
      };
    }
    case NftsDocument.type: {
      const ids = store.ids;
      const nfts = store.nfts;
      const documentNfts: UsersNftCardInterface[] = action.payload;
      const nftsIds = documentNfts.map((nft) => nft.id);
      const normalizedNfts = documentNfts.reduce((acc, nft) => {
        acc[nft.id] = nft;
        return acc;
      }, {} as NormalizedNftsStore['nfts']);
      nftsIds.forEach((id) => {
        if (!ids.includes(id)) {
          ids.push(id);
        }
      });
      return {
        ids,
        nfts: {...nfts, ...normalizedNfts},
      };
    }
    default:
      return store;
  }
};

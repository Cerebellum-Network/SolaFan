import {combineActions, handleActions} from 'redux-actions';

import {loadNft, loadNfts, unloadNft, unloadNfts} from './actions';
import {Payload, State} from './types';

const defaults: State = {};

export const reducer = handleActions<State, Payload>(
  {
    [combineActions(loadNfts, loadNft).toString()](state, {payload}) {
      const init: State = {};
      const nfts = payload.reduce((acc, nft) => {
        acc[nft.id] = nft;
        return acc;
      }, init);
      return {...state, ...nfts};
    },
    [combineActions(unloadNft, unloadNfts).toString()](state, {payload}) {
      const removedKeys = new Set<string>(payload.map((nft) => nft.id));
      const init: State = {};
      return Object.entries(state).reduce((acc, [key, val]) => {
        if (removedKeys.has(key)) {
          return acc;
        }
        acc[key] = val;
        return acc;
      }, init);
    },
  },
  defaults,
);

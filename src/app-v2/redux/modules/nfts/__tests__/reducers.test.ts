import {NftDocument, NftsDocument} from '../actions';
import {allNftsReducer} from '../reducers';

describe('nfts reducers', () => {
  describe('allNftsReducer', () => {
    it('adds an nft to the store', () => {
      const store = {
        ids: [],
        nfts: {},
      };
      expect(allNftsReducer(store, NftDocument.create({id: '1', address: '123'} as any))).toEqual({
        ids: ['1'],
        nfts: {
          '1': {id: '1', address: '123'},
        },
      });
    });

    it('updates an nft with new data', () => {
      const store = {
        ids: ['1'],
        nfts: {
          '1': {id: '1', address: '123'},
        },
      } as any;
      expect(allNftsReducer(store, NftDocument.create({id: '1', address: '123', price: 12} as any))).toEqual({
        ids: ['1'],
        nfts: {
          '1': {id: '1', address: '123', price: 12},
        },
      });
    });

    it('adds many nfts to the store', () => {
      const store = {
        ids: [],
        nfts: {},
      };
      expect(
        allNftsReducer(
          store,
          NftsDocument.create([
            {id: '1', address: '123', price: 12},
            {id: '2', address: '321', price: 21},
          ] as any),
        ),
      ).toEqual({
        ids: ['1', '2'],
        nfts: {
          '1': {id: '1', address: '123', price: 12},
          '2': {id: '2', address: '321', price: 21},
        },
      });
    });

    it('updates several nfts with new data', () => {
      const store = {
        ids: ['1', '2'],
        nfts: {
          '1': {id: '1', address: '123', price: 12},
          '2': {id: '2', address: '321', price: 21},
        },
      } as any;
      expect(
        allNftsReducer(
          store,
          NftsDocument.create([
            {id: '1', address: '123', price: 12, balance: 1},
            {id: '2', address: '321', price: 21, balance: 2},
            {id: '3', address: '333', price: 33, balance: 3},
          ] as any),
        ),
      ).toEqual({
        ids: ['1', '2', '3'],
        nfts: {
          '1': {id: '1', address: '123', price: 12, balance: 1},
          '2': {id: '2', address: '321', price: 21, balance: 2},
          '3': {id: '3', address: '333', price: 33, balance: 3},
        },
      });
    });
  });
});

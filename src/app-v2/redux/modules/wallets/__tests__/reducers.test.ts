import {SupportedWalletType} from '../../../../models/wallet/types';
import {ActiveWalletTypeDocument, ConnectedWalletsTypesDocument, WalletsBalanceDocument} from '../actions';
import {connectedWalletsReducer, selectedWalletReducer, walletsBalanceReducer} from '../reducers';

describe('User wallets reducers', () => {
  describe('selectedWalletReducer', () => {
    it('returns TORUS wallet by default', () => {
      expect(selectedWalletReducer(undefined, {type: 'test'})).toEqual(SupportedWalletType.CEREWALLET);
    });

    it('changes selected wallet type', () => {
      expect(
        selectedWalletReducer(
          SupportedWalletType.CEREWALLET,
          ActiveWalletTypeDocument.create(SupportedWalletType.METAMASK),
        ),
      ).toEqual(SupportedWalletType.METAMASK);
    });
  });

  describe('connectedWalletsReducer', () => {
    it('returns an empty array by default', () => {
      expect(connectedWalletsReducer(undefined, {type: 'test'})).toEqual([]);
    });

    it('sets connected wallets types', () => {
      expect(
        connectedWalletsReducer(
          [],
          ConnectedWalletsTypesDocument.create([SupportedWalletType.METAMASK, SupportedWalletType.CEREWALLET]),
        ),
      ).toEqual([SupportedWalletType.METAMASK, SupportedWalletType.CEREWALLET]);
    });
  });

  describe('walletsBalanceReducer', () => {
    it('returns an empty object by default', () => {
      expect(walletsBalanceReducer(undefined, {} as any)).toEqual({});
    });

    it('stores user wallets balance', () => {
      expect(walletsBalanceReducer(undefined, WalletsBalanceDocument.create('balance' as any))).toEqual('balance');
    });
  });
});

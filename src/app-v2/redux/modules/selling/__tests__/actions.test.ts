import {DeleteOrderModal} from '../../../../components/connected/SellModals/DeleteOrderModal';
import {SellFailedModal} from '../../../../components/connected/SellModals/SellFailedModal';
import {SellModal} from '../../../../components/connected/SellModals/SellModal';
import {SellSuccessModal} from '../../../../components/connected/SellModals/SellSuccessModal';
import {
  CancelNFTSellingCommand,
  CancelNFTSellingFailedEvent,
  CancelNFTSellingSuccessEvent,
  NFTSellFailedEvent,
  NFTSellSuccessEvent,
  SellNFTCommand,
  ShowCancelNFTSellingModalCommand,
  ShowNFTSellFailedModalCommand,
  ShowNFTSellingCancelFailedModalCommand,
  ShowNFTSellingCancelSuccessModalCommand,
  ShowNFTSellSuccessModalCommand,
  ShowSellNFTModalCommand,
  StartNFTSellingCommand,
} from '../actions';

jest.mock('../../../../../config/common', () => ({
  FIREBASE_API_KEY: () => 'test',
  FIREBASE_AUTH_DOMAIN: () => 'test',
  FIREBASE_PROJECT_ID: () => 'test',
  FIREBASE_APP_ID: () => 'test',
  IDENTITY_API_URL: () => '',
  tenantId: () => '',
  APP_ID: () => '',
  NETWORK_ID: '123',
  HTTP_PROVIDER_URL: '123',
  TOKEN_DECIMALS_POW: 18,
}));

describe('selling actions', () => {
  it('creates tart nft selling command', () => {
    expect(StartNFTSellingCommand.create('1')).toEqual({
      type: '[NFT] Start selling',
      payload: '1',
    });
  });

  it('creates sell nft command', () => {
    expect(SellNFTCommand.create('1', 10, 2)).toEqual({
      type: '[NFT] Sell',
      payload: {
        nftId: '1',
        price: 10,
        amount: 2,
      },
    });
  });

  it('creates nft sell success event', () => {
    expect(NFTSellSuccessEvent.create()).toEqual({
      type: '[NFT] Sell success',
    });
  });

  it('creates nft sell failed event', () => {
    expect(NFTSellFailedEvent.create('1', 'test')).toEqual({
      type: '[NFT] Sell failed',
      payload: {
        nftId: '1',
        message: 'test',
      },
    });
  });

  it('creates cancel nft selling command', () => {
    expect(CancelNFTSellingCommand.create('1', '123')).toEqual({
      type: '[NFT] Cancel selling',
      payload: {nftId: '1', orderId: '123'},
    });
  });

  it('creates nft selling cancel success event', () => {
    expect(CancelNFTSellingSuccessEvent.create()).toEqual({
      type: '[NFT] Sell cancel success',
    });
  });

  it('creates cancel nft sell failed event', () => {
    expect(CancelNFTSellingFailedEvent.create('1', 'test')).toEqual({
      type: '[NFT] Sell cancel failed',
      payload: {
        nftId: '1',
        message: 'test',
      },
    });
  });

  it('creates show sell nft modal command', () => {
    expect(ShowSellNFTModalCommand.create('1')).toEqual({
      type: '[MODAL] Show sell NFT modal',
      payload: {nftId: '1'},
      component: SellModal,
    });
  });

  it('creates show nft sell success modal command', () => {
    expect(ShowNFTSellSuccessModalCommand.create('1', 10, 1)).toEqual({
      type: '[MODAL] Show NFT sell success modal',
      component: SellSuccessModal,
      payload: {
        nftId: '1',
        price: 10,
        qty: 1,
      },
    });
  });

  it('creates show nft sell failed modal command', () => {
    expect(ShowNFTSellFailedModalCommand.create('1', 10, 1)).toEqual({
      type: '[MODAL] Show NFT sell failed modal',
      component: SellFailedModal,
      payload: {
        nftId: '1',
        price: 10,
        amount: 1,
      },
    });
  });

  it('creates show cancel nft selling modal command', () => {
    expect(ShowCancelNFTSellingModalCommand.create('1', 1, '123')).toEqual({
      type: '[MODAL] Show cancel NFT selling modal',
      component: DeleteOrderModal,
      payload: {nftId: '1', orderId: '123', qty: 1},
    });
  });

  it('creates show cancel nft selling success modal command', () => {
    expect(ShowNFTSellingCancelSuccessModalCommand.create()).toEqual({
      type: '[MODAL] Show NFT selling cancel success modal',
    });
  });

  it('creates show nft listing cancelling failed modal command', () => {
    expect(ShowNFTSellingCancelFailedModalCommand.create('message')).toEqual({
      type: '[MODAL] Show NFT selling cancel failed modal',
      payload: 'message',
    });
  });
});

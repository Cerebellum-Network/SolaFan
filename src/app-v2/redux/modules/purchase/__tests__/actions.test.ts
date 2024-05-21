import {PurchaseFromMinterModal} from '../../../../components/connected/PurchaseModals/PurchaseFromMinterModal';
import {PurchaseOnMarketplaceModal} from '../../../../components/connected/PurchaseModals/PurchaseOnMarketplaceModal';
import {UpdatedPurchaseFailedModal} from '../../../../components/connected/PurchaseModals/UpdatedPurchaseFailedModal';
import {UpdatedPurchaseSuccessfulModal} from '../../../../components/connected/PurchaseModals/UpdatedPurchaseSuccessfulModal';
import {
  NFTPurchaseStartedEvent,
  PurchaseNFTFailedEvent,
  PurchaseNFTForCryptoCommand,
  PurchaseNFTForFiatCommand,
  PurchaseNFTSuccessEvent,
  ShowContinuePurchaseModalCommand,
  ShowPurchaseFailedModalCommand,
  ShowPurchaseSuccessModalCommand,
  ShowStartPurchaseFromMinterModalCommand,
  ShowStartPurchaseOnMarketplaceModalCommand,
  StartPrimaryNFTPurchaseCommand,
  StartSecondaryNFTPurchaseCommand,
} from '../actions';

jest.mock('../../../../../config/common', () => ({
  FIREBASE_API_KEY: () => 'test',
  FIREBASE_AUTH_DOMAIN: () => 'test',
  FIREBASE_PROJECT_ID: () => 'test',
  FIREBASE_APP_ID: () => 'test',
  IDENTITY_API_URL: () => '',
  tenantId: () => '',
  APP_ID: () => '',
  APPLICATION: () => 'davinci',
  NETWORK_ID: '123',
  HTTP_PROVIDER_URL: '123',
  TOKEN_DECIMALS_POW: 18,
}));

describe('purchase actions', () => {
  it('creates start primary purchase command', () => {
    expect(StartPrimaryNFTPurchaseCommand.create('1', '123', 2)).toEqual({
      type: '[NFT] Start NFT purchase from minter',
      payload: {
        nftId: '1',
        orderId: '123',
        qty: 2,
        returnTo: '',
      },
    });
  });

  it('creates start secondary purchase command', () => {
    expect(StartSecondaryNFTPurchaseCommand.create('1', '123', 'address', 1, 2)).toEqual({
      type: '[NFT] Start NFT purchase on marketplace',
      payload: {
        nftId: '1',
        orderId: '123',
        sellerWalletAddress: 'address',
        price: 1,
        qty: 2,
      },
    });
  });

  it('creates purchase nft for crypto command', () => {
    expect(PurchaseNFTForCryptoCommand.create('1', '123', 'address', 1, 2)).toEqual({
      type: '[NFT] Purchase NFT for crypto',
      payload: {
        nftId: '1',
        orderId: '123',
        sellerWalletAddress: 'address',
        price: 1,
        qty: 2,
      },
    });
  });

  it('creates purchase nft for fiat command', () => {
    expect(PurchaseNFTForFiatCommand.create('1', '123', 2, 'test@test.com', '')).toEqual({
      type: '[NFT] Purchase NFT for fiat',
      payload: {
        email: 'test@test.com',
        nftId: '1',
        orderId: '123',
        qty: 2,
        returnTo: '',
      },
    });
  });

  it('creates nft purchase started event', () => {
    expect(NFTPurchaseStartedEvent.create()).toEqual({
      type: '[NFT] Purchase started',
    });
  });

  it('creates nft purchase success event', () => {
    expect(PurchaseNFTSuccessEvent.create('1')).toEqual({
      type: '[NFT] Purchase success',
      payload: '1',
    });
  });

  it('creates nft purchase failed event', () => {
    expect(PurchaseNFTFailedEvent.create('1', 'message')).toEqual({
      type: '[NFT] Purchase failed',
      payload: {
        nftId: '1',
        message: 'message',
      },
    });
  });

  it('creates a command to show purchase from minter modal', () => {
    expect(ShowStartPurchaseFromMinterModalCommand.create('1', '123', 1)).toEqual({
      type: '[MODAL] Show start purchase from minter modal',
      component: PurchaseFromMinterModal,
      payload: {nftId: '1', orderId: '123', qty: 1},
    });
  });

  it('creates a command to show purchase on marketplace modal', () => {
    expect(ShowStartPurchaseOnMarketplaceModalCommand.create('1', '123', 'address', 10, 1)).toEqual({
      type: '[MODAL] Show start purchase on marketplace modal',
      component: PurchaseOnMarketplaceModal,
      payload: {
        nftId: '1',
        orderId: '123',
        sellerWalletAddress: 'address',
        price: 10,
        qty: 1,
      },
    });
  });

  it('creates a command to show continue purchase modal', () => {
    expect(ShowContinuePurchaseModalCommand.create('1', 'address', 10, 1)).toEqual({
      type: '[MODAL] Show continue purchase modal',
      payload: {
        nftId: '1',
        sellerWalletAddress: 'address',
        price: 10,
        qty: 1,
      },
    });
  });

  it('creates a command to show purchase success modal', () => {
    expect(ShowPurchaseSuccessModalCommand.create('1', 10, 1)).toEqual({
      type: '[MODAL] Show purchase success modal',
      component: UpdatedPurchaseSuccessfulModal,
      payload: {
        nftId: '1',
        price: 10,
        qty: 1,
      },
    });
  });

  it('creates a command to show purchase failed modal', () => {
    expect(ShowPurchaseFailedModalCommand.create('1', '123', 10, 1, 'email@cere.io')).toEqual({
      type: '[MODAL] Show purchase failed modal',
      component: UpdatedPurchaseFailedModal,
      payload: {
        nftId: '1',
        orderId: '123',
        price: 10,
        qty: 1,
        email: 'email@cere.io',
      },
    });
  });
});

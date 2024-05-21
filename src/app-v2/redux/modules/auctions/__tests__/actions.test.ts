import {PlaceBidFailedModal} from '../../../../components/connected/BidModals/PlaceBidFailedModal';
import {PlaceBidModal} from '../../../../components/connected/BidModals/PlaceBidModal';
import {PlaceBidSuccessModal} from '../../../../components/connected/BidModals/PlaceBidSuccessModal';
import {
  CreateAuctionCommand,
  CreateAuctionFailedEvent,
  CreateAuctionSuccessEvent,
  PlaceBidCommand,
  PlaceBidFailedEvent,
  PlaceBidSuccessEvent,
  SettleAuctionCommand,
  SettleAuctionFailedEvent,
  SettleAuctionSuccessEvent,
  ShowBidFailedModalCommand,
  ShowBidModalCommand,
  ShowBidSuccessModalCommand,
  StartBidFlowCommand,
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

describe('auction actions', () => {
  it('creates a command to start nft bid flow', () => {
    expect(StartBidFlowCommand.create('1', 'address')).toEqual({
      type: '[NFT] Start bid flow',
      payload: {
        nftId: '1',
        sellerWalletAddress: 'address',
      },
    });
  });

  it('creates a command to place a bid', () => {
    expect(PlaceBidCommand.create('1', '123', 'address', 10)).toEqual({
      type: '[NFT] Place bid',
      payload: {
        nftId: '1',
        auctionId: '123',
        price: 10,
        sellerWalletAddress: 'address',
      },
    });
  });

  it('creates bid place success event', () => {
    expect(PlaceBidSuccessEvent.create('1', 10)).toEqual({
      type: '[NFT] Place bid success',
      payload: {
        nftId: '1',
        price: 10,
      },
    });
  });

  it('creates place bid failed event', () => {
    expect(PlaceBidFailedEvent.create('1', 'message')).toEqual({
      type: '[NFT] Place bid failed',
      payload: {
        nftId: '1',
        message: 'message',
      },
    });
  });

  it('creates a command to start an auction', () => {
    expect(CreateAuctionCommand.create('1', 10, 123, 10)).toEqual({
      type: '[NFT] Create auction',
      payload: {
        nftId: '1',
        startingPrice: 10,
        amount: 123,
        duration: 10,
      },
    });
  });

  it('creates auction created successfully event', () => {
    expect(CreateAuctionSuccessEvent.create('1')).toEqual({
      type: '[NFT] Create auction success',
      payload: '1',
    });
  });

  it('creates action creation failed event', () => {
    expect(CreateAuctionFailedEvent.create('1', 'message')).toEqual({
      type: '[NFT] Create auction failed',
      payload: {
        nftId: '1',
        message: 'message',
      },
    });
  });

  it('creates a command to settle an auction', () => {
    expect(SettleAuctionCommand.create('1', '123')).toEqual({
      type: '[NFT] Settle auction',
      payload: {
        nftId: '1',
        auctionId: '123',
      },
    });
  });

  it('creates auction settled successfully event', () => {
    expect(SettleAuctionSuccessEvent.create('1')).toEqual({
      type: '[NFT] Settle auction success',
      payload: '1',
    });
  });

  it('creates auction settling failed event', () => {
    expect(SettleAuctionFailedEvent.create('1', 'message')).toEqual({
      type: '[NFT] Settle auction failed',
      payload: {
        nftId: '1',
        message: 'message',
      },
    });
  });

  it('creates a command to show bid modal', () => {
    expect(ShowBidModalCommand.create('1', 10, 'address')).toEqual({
      type: '[MODAL] Show bid modal',
      component: PlaceBidModal,
      payload: {
        nftId: '1',
        minBidPrice: 10,
        sellerWalletAddress: 'address',
      },
    });
  });

  it('creates a command to show bid success modal', () => {
    expect(ShowBidSuccessModalCommand.create('1', 10)).toEqual({
      type: '[MODAL] Show bid success modal',
      component: PlaceBidSuccessModal,
      payload: {
        nftId: '1',
        price: 10,
      },
    });
  });

  it('creates a command to show bid failed modal', () => {
    expect(ShowBidFailedModalCommand.create('1', 10, 'sellerWalletAddress', 'message')).toEqual({
      type: '[MODAL] Show bid failed modal',
      component: PlaceBidFailedModal,
      payload: {
        nftId: '1',
        price: 10,
        sellerWalletAddress: 'sellerWalletAddress',
        message: 'message',
      },
    });
  });
});

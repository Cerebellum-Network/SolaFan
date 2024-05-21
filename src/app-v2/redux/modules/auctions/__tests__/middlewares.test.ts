import {IAuctionsApi} from '../../../../api/auctions/IAuctionsApi';
import {AuctionService} from '../../../../models/auction/AuctionService';
import {IAuctionSCApi} from '../../../../models/auction/IAuctionSCApi';
import {WalletConnectionService} from '../../../../models/wallet/WalletConnectionService';
import {mockMiddleware} from '../../../base/store.mock';
import {ShowNFTSellFailedModalCommand, ShowNFTSellSuccessModalCommand} from '../../selling/actions';
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
import {
  createAuctionMiddleware,
  placeBidMiddleware,
  settleActionMiddleware,
  startNftBidFlowMiddleware,
} from '../middlewares';

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

describe('auctions middleware', () => {
  let auctionsApi: IAuctionsApi;
  let auctionSCApi: IAuctionSCApi;
  let walletConnectionService: WalletConnectionService;

  beforeEach(() => {
    auctionsApi = {
      getOpenedAuctionForNftAndSeller: jest.fn(),
    };
    auctionSCApi = {
      placeBid: jest.fn(),
      startAuction: jest.fn(),
      settleAuction: jest.fn(),
    };
    walletConnectionService = {
      getSelectedWalletAddress: jest.fn(() => 'address-1'),
      getWalletTypeByAddress: jest.fn(() => 'type-1'),
    } as any;
  });

  describe('startNftBidFlowMiddleware', () => {
    it('starts nft bid flow for an auction with no bids', async () => {
      (auctionsApi.getOpenedAuctionForNftAndSeller as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          bids: [],
          price: 10,
        }),
      );
      const {invoke, next, store} = mockMiddleware(startNftBidFlowMiddleware(auctionsApi, new AuctionService()));
      await invoke(StartBidFlowCommand.create('id', 'address'));
      expect(next).toBeCalled();
      expect(auctionsApi.getOpenedAuctionForNftAndSeller).toHaveBeenCalledWith('id', 'address');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(ShowBidModalCommand.create('id', 11, 'address'));
    });

    it('starts nft bid flow for an auctions with some bids', async () => {
      (auctionsApi.getOpenedAuctionForNftAndSeller as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          bids: [{price: 20}, {price: 15}, {price: 11}],
          price: 10,
        }),
      );
      const {invoke, next, store} = mockMiddleware(startNftBidFlowMiddleware(auctionsApi, new AuctionService()));
      await invoke(StartBidFlowCommand.create('id', 'address'));
      expect(next).toBeCalled();
      expect(auctionsApi.getOpenedAuctionForNftAndSeller).toHaveBeenCalledWith('id', 'address');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(ShowBidModalCommand.create('id', 22, 'address'));
    });

    it('dispatches an error if no auction data was found', async () => {
      (auctionsApi.getOpenedAuctionForNftAndSeller as jest.Mock).mockImplementationOnce(() => Promise.resolve(null));
      const {invoke, next, store} = mockMiddleware(startNftBidFlowMiddleware(auctionsApi, new AuctionService()));
      await invoke(StartBidFlowCommand.create('id', 'address'));
      expect(next).toBeCalled();
      expect(auctionsApi.getOpenedAuctionForNftAndSeller).toHaveBeenCalledWith('id', 'address');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(PlaceBidFailedEvent.create('id', 'Auction not found'));
    });

    it('dispatches an error if fetched auction has no price data', async () => {
      (auctionsApi.getOpenedAuctionForNftAndSeller as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          bids: [],
        }),
      );
      const {invoke, next, store} = mockMiddleware(startNftBidFlowMiddleware(auctionsApi, new AuctionService()));
      await invoke(StartBidFlowCommand.create('id', 'address'));
      expect(next).toBeCalled();
      expect(auctionsApi.getOpenedAuctionForNftAndSeller).toHaveBeenCalledWith('id', 'address');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(PlaceBidFailedEvent.create('id', 'Invalid auction data'));
    });

    it('dispatches an error if auction data fetch failed', async () => {
      (auctionsApi.getOpenedAuctionForNftAndSeller as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(startNftBidFlowMiddleware(auctionsApi, new AuctionService()));
      await invoke(StartBidFlowCommand.create('id', 'address'));
      expect(next).toBeCalled();
      expect(auctionsApi.getOpenedAuctionForNftAndSeller).toHaveBeenCalledWith('id', 'address');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(PlaceBidFailedEvent.create('id', 'message'));
    });
  });

  describe('placeBidMiddleware', () => {
    it('places a new bid', async () => {
      const {invoke, next, store} = mockMiddleware(placeBidMiddleware(auctionSCApi));
      store.getState.mockImplementationOnce(() => ({
        'loaded-nfts': {nfts: {id: {address: 'address', collectionAddress: 'collectionAddress'}}},
      }));
      await invoke(PlaceBidCommand.create('id', '123', 'sellerAddress', 10));
      expect(next).toBeCalled();
      expect(auctionSCApi.placeBid).toBeCalledWith('123', 10);
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([PlaceBidSuccessEvent.create('id', 10)]);
      expect(call2).toEqual([ShowBidSuccessModalCommand.create('id', 10)]);
    });

    it('dispatches an error and shows error modal if bid placement failed', async () => {
      (auctionSCApi.placeBid as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(placeBidMiddleware(auctionSCApi));
      store.getState.mockImplementationOnce(() => ({
        'loaded-nfts': {nfts: {id: {address: 'address', collectionAddress: 'collectionAddress'}}},
      }));
      await invoke(PlaceBidCommand.create('id', '123', 'sellerAddress', 10));
      expect(next).toBeCalled();
      expect(auctionSCApi.placeBid).toBeCalledWith('123', 10);
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([PlaceBidFailedEvent.create('id', 'message')]);
      expect(call2).toEqual([ShowBidFailedModalCommand.create('id', 10, 'sellerAddress', 'message')]);
    });

    it('dispatches an error if no nft data was found', async () => {
      const {invoke, next, store} = mockMiddleware(placeBidMiddleware(auctionSCApi));
      store.getState.mockImplementationOnce(() => ({
        'loaded-nfts': {nfts: {}},
      }));
      await invoke(PlaceBidCommand.create('id', '123', 'sellerAddress', 10));
      expect(next).toBeCalled();
      expect(walletConnectionService.getSelectedWalletAddress).not.toBeCalled();
      expect(auctionSCApi.placeBid).not.toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(PlaceBidFailedEvent.create('id', 'NFT data not found'));
    });
  });

  describe('createAuctionMiddleware', () => {
    it('creates a new auction', async () => {
      const {invoke, next, store} = mockMiddleware(createAuctionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {'1': {address: 'address', collectionAddress: 'collectionAddress'}}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(CreateAuctionCommand.create('1', 10, 1, 1234));
      expect(next).toBeCalled();
      expect(auctionSCApi.startAuction).toBeCalledWith('address', 10, 1, 1234, 'collectionAddress');
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([CreateAuctionSuccessEvent.create('1')]);
      expect(call2).toEqual([ShowNFTSellSuccessModalCommand.create('1', 10, 1)]);
    });

    it('dispatches an error if action creation failed', async () => {
      (auctionSCApi.startAuction as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(createAuctionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {'1': {address: 'address', collectionAddress: 'collectionAddress'}}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(CreateAuctionCommand.create('1', 10, 1, 1234));
      expect(next).toBeCalled();
      expect(auctionSCApi.startAuction).toBeCalledWith('address', 10, 1, 1234, 'collectionAddress');
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([CreateAuctionFailedEvent.create('1', 'message')]);
      expect(call2).toEqual([ShowNFTSellFailedModalCommand.create('1', 10, 1)]);
    });

    it('dispatches an error if no nft data was found', async () => {
      const {invoke, next, store} = mockMiddleware(createAuctionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(CreateAuctionCommand.create('1', 10, 1, 1234));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(CreateAuctionFailedEvent.create('1', 'NFT data not found'));
    });
  });

  describe('settleActionMiddleware', () => {
    it('settles an auction', async () => {
      const {invoke, next, store} = mockMiddleware(settleActionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {'1': {address: 'address', collectionAddress: 'collectionAddress'}}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(SettleAuctionCommand.create('1', '123'));
      expect(next).toBeCalled();
      expect(auctionSCApi.settleAuction).toBeCalledWith('123');
      expect(store.dispatch).toBeCalledTimes(1);
    });

    it('switches a wallet and settles an auction', async () => {
      (walletConnectionService.getSelectedWalletAddress as jest.Mock).mockImplementationOnce(() => 'address-2');
      const {invoke, next, store} = mockMiddleware(settleActionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {'1': {address: 'address', collectionAddress: 'collectionAddress'}}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(SettleAuctionCommand.create('1', '123'));
      expect(next).toBeCalled();
      expect(auctionSCApi.settleAuction).toBeCalledWith('123');
      expect(store.dispatch).toBeCalledTimes(1);
      const [call2] = store.dispatch.mock.calls;
      expect(call2).toEqual([SettleAuctionSuccessEvent.create('1')]);
    });

    it('dispatches an error if auction settling failed', async () => {
      (auctionSCApi.settleAuction as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(settleActionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {'1': {address: 'address', collectionAddress: 'collectionAddress'}}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(SettleAuctionCommand.create('1', '123'));
      expect(next).toBeCalled();
      expect(auctionSCApi.settleAuction).toBeCalledWith('123');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(SettleAuctionFailedEvent.create('1', 'message'));
    });

    it('dispatches an error if no nft data was found', async () => {
      const {invoke, next, store} = mockMiddleware(settleActionMiddleware(auctionSCApi));
      store.getState.mockImplementation(() => ({
        'loaded-nfts': {nfts: {}},
        'purchase-history': {'1': {id: '1', userWalletAddress: 'address-1', qty: 1}},
      }));
      await invoke(SettleAuctionCommand.create('1', '123'));
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(SettleAuctionFailedEvent.create('1', 'NFT data not found'));
    });
  });
});

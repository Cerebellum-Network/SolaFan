// import {INftsApi} from '../../../../api/nfts/INftsApi';
// import {IPaymentApi} from '../../../../api/payment/IPaymentApi';
// import {UserDataStorage} from '../../../../models/auth/UserDataStorage';
// import {PendingTransactionType} from '../../../../models/pending-transactions/types';
// import {IPurchaseNFTApi} from '../../../../models/puchase/IPurchaseNFTApi';
// import {WalletConnectionService} from '../../../../models/wallet/WalletConnectionService';
// import {mockMiddleware} from '../../../base/store.mock';
// import {NftDocument} from '../../nfts/actions';
// import {SetPendingTransactionForNftCommand} from '../../pending-transactions/actions';
// import {
// NFTPurchaseStartedEvent,
// PurchaseNFTFailedEvent,
// PurchaseNFTForCryptoCommand,
// PurchaseNFTForFiatCommand,
// PurchaseNFTSuccessEvent,
// ShowPurchaseFailedModalCommand,
// ShowPurchaseSuccessModalCommand,
// ShowStartPurchaseOnMarketplaceModalCommand,
// StartPrimaryNFTPurchaseCommand,
// StartSecondaryNFTPurchaseCommand,
// } from '../actions';
// import {
// purchaseNftForCryptoMiddleware,
// purchaseNftForFiatMiddleware,
// startPurchaseFromMinterMiddleware,
// startPurchaseOnMarketplaceMiddleware,
// } from '../middlewares';

// jest.mock('../../../../../config/common', () => ({
//   FIREBASE_API_KEY: () => 'test',
//   FIREBASE_AUTH_DOMAIN: () => 'test',
//   FIREBASE_PROJECT_ID: () => 'test',
//   FIREBASE_APP_ID: () => 'test',
//   IDENTITY_API_URL: () => '',
//   tenantId: () => '',
//   APP_ID: () => '',
//   NETWORK_ID: '123',
//   HTTP_PROVIDER_URL: '123',
//   TOKEN_DECIMALS_POW: 18,
// }));

// @ts-ignore
describe('purchase middlewares', () => {
  // let nftApi: INftsApi;
  // let purchaseApi: IPurchaseNFTApi;
  // let walletConnectionService: WalletConnectionService;
  // let paymentApi: IPaymentApi;
  // let userDataStorage: UserDataStorage;
  //
  beforeEach(() => {
    // nftApi = {
    //   getNftById: jest.fn(() => Promise.resolve('nft')),
    // } as any;
    // purchaseApi = {
    //   purchaseNft: jest.fn(() => Promise.resolve(1111)),
    // } as any;
    // walletConnectionService = {
    //   getSelectedWalletAddress: jest.fn(() => 'wallet-address'),
    // } as any;
    // paymentApi = {
    //   getFiatPaymentUrl: jest.fn(() => Promise.resolve('payment-url')),
    // };
    // userDataStorage = {
    //   clearNftQuery: jest.fn(),
    // } as any;
  });
  //
  //   describe('startPurchaseFromMinterMiddleware', () => {
  //     it('starts nft purchasing from minter with pre-loaded nft data', async () => {
  //       const {invoke, next, store} = mockMiddleware(startPurchaseFromMinterMiddleware(nftApi));
  //       store.getState.mockImplementation(() => ({
  //         'loaded-nfts': {nfts: {1: 'data'}},
  //         locale: 'en',
  //         auth: {email: 'email'},
  //       }));
  //       await invoke(StartPrimaryNFTPurchaseCommand.create('1', '123', 1, ''));
  //       expect(next).toBeCalled();
  //       expect(store.dispatch).toBeCalledTimes(1);
  //       expect(store.dispatch).toBeCalledWith(PurchaseNFTForFiatCommand.create('1', '123', 1, ''));
  //     });
  //
  //     it('starts nft purchasing from minter and loads missing nft data', async () => {
  //       const {invoke, next, store} = mockMiddleware(startPurchaseFromMinterMiddleware(nftApi));
  //       store.getState.mockImplementation(() => ({
  //         'loaded-nfts': {nfts: {}},
  //         locale: 'en',
  //         auth: {email: 'email'},
  //       }));
  //       await invoke(StartPrimaryNFTPurchaseCommand.create('1', '123'));
  //       expect(next).toBeCalled();
  //       expect(nftApi.getNftById).toBeCalledWith('1', 'en');
  //       expect(store.dispatch).toBeCalledTimes(2);
  //       const [call1, call2] = store.dispatch.mock.calls;
  //       expect(call1).toEqual([NftDocument.create('nft' as any)]);
  //       expect(call2).toEqual([PurchaseNFTForFiatCommand.create('1', '123', 1, '')]);
  //     });
  //
  //     it('processes nft data loading error', async () => {
  //       (nftApi.getNftById as jest.Mock).mockImplementationOnce(() => {
  //         throw new Error('message');
  //       });
  //       const {invoke, next, store} = mockMiddleware(startPurchaseFromMinterMiddleware(nftApi));
  //       store.getState.mockImplementation(() => ({
  //         'loaded-nfts': {nfts: {}},
  //         locale: 'en',
  //         auth: {email: 'email'},
  //       }));
  //       await invoke(StartPrimaryNFTPurchaseCommand.create('1', '123'));
  //       expect(next).toBeCalled();
  //       expect(nftApi.getNftById).toBeCalledWith('1', 'en');
  //       expect(store.dispatch).toBeCalledTimes(1);
  //       expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'message'));
  //     });
  //   });

  describe('startPurchaseOnMarketplaceMiddleware', () => {
    //   it('starts nft purchasing on the marketplace with pre-loaded nft data', async () => {
    //     const {invoke, next, store} = mockMiddleware(startPurchaseOnMarketplaceMiddleware(nftApi));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {1: 'data'}},
    //       locale: 'en',
    //     }));
    //     await invoke(StartSecondaryNFTPurchaseCommand.create('1', '123', 'sellerWallet', 1, 1));
    //     expect(next).toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(
    //       ShowStartPurchaseOnMarketplaceModalCommand.create('1', '123', 'sellerWallet', 1, 1),
    //     );
    //   });
    //
    //   it('starts nft purchasing on the marketplace and loads missing nft data', async () => {
    //     const {invoke, next, store} = mockMiddleware(startPurchaseOnMarketplaceMiddleware(nftApi));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {}},
    //       locale: 'en',
    //       auth: {email: 'email'},
    //     }));
    //     await invoke(StartSecondaryNFTPurchaseCommand.create('1', '123', 'sellerWallet', 1, 1));
    //     expect(next).toBeCalled();
    //     expect(nftApi.getNftById).toBeCalledWith('1', 'en');
    //     expect(store.dispatch).toBeCalledTimes(2);
    //     const [call1, call2] = store.dispatch.mock.calls;
    //     expect(call1).toEqual([NftDocument.create('nft' as any)]);
    //     expect(call2).toEqual([ShowStartPurchaseOnMarketplaceModalCommand.create('1', '123', 'sellerWallet', 1, 1)]);
    //   });
    //
    //   it('processes nft data loading error', async () => {
    //     (nftApi.getNftById as jest.Mock).mockImplementationOnce(() => {
    //       throw new Error('message');
    //     });
    //     const {invoke, next, store} = mockMiddleware(startPurchaseOnMarketplaceMiddleware(nftApi));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {}},
    //       locale: 'en',
    //       auth: {email: 'email'},
    //     }));
    //     await invoke(StartSecondaryNFTPurchaseCommand.create('1', '123', 'sellerWallet', 1, 1));
    //     expect(next).toBeCalled();
    //     expect(nftApi.getNftById).toBeCalledWith('1', 'en');
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'message'));
    //   });
    // });
    //
    // describe('purchaseNftForCryptoMiddleware', () => {
    //   it('purchases an NFT for crypto', async () => {
    //     const {invoke, next, store} = mockMiddleware(
    //       purchaseNftForCryptoMiddleware(purchaseApi, walletConnectionService, userDataStorage),
    //     );
    //     store.getState.mockImplementationOnce(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', collectionAddress: 'collectionAddress'}}},
    //     }));
    //     await invoke(PurchaseNFTForCryptoCommand.create('1', '123', 'sellerWallet', 2, 1));
    //     expect(next).toBeCalled();
    //     expect(walletConnectionService.getSelectedWalletAddress).toBeCalled();
    //     expect(purchaseApi.purchaseNft).toBeCalledWith('123', 1);
    //     expect(store.dispatch).toBeCalledTimes(4);
    //     const [call1, call2, call3, call4] = store.dispatch.mock.calls;
    //     expect(call1).toEqual([NFTPurchaseStartedEvent.create()]);
    //     expect(call2).toEqual([PurchaseNFTSuccessEvent.create('1')]);
    //     expect(call3).toEqual([ShowPurchaseSuccessModalCommand.create('1', 2, 1)]);
    //     expect(call4).toEqual([
    //       SetPendingTransactionForNftCommand.create(
    //         'wallet-address',
    //         '1',
    //         'collectionAddress',
    //         PendingTransactionType.BuyTransaction,
    //         2,
    //         1111,
    //       ),
    //     ]);
    //   });
    //
    //   it('shows purchase error modal if purchase failed', async () => {
    //     (purchaseApi.purchaseNft as jest.Mock).mockImplementationOnce(() => {
    //       throw new Error('message');
    //     });
    //     const {invoke, next, store} = mockMiddleware(
    //       purchaseNftForCryptoMiddleware(purchaseApi, walletConnectionService, userDataStorage),
    //     );
    //     store.getState.mockImplementationOnce(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', collectionAddress: 'collectionAddress'}}},
    //     }));
    //     await invoke(PurchaseNFTForCryptoCommand.create('1', '123', 'sellerWallet', 2, 1));
    //     expect(next).toBeCalled();
    //     expect(walletConnectionService.getSelectedWalletAddress).toBeCalled();
    //     expect(purchaseApi.purchaseNft).toBeCalledWith('123', 1);
    //     expect(store.dispatch).toBeCalledTimes(3);
    //     const [call1, call2, call3] = store.dispatch.mock.calls;
    //     expect(call1).toEqual([NFTPurchaseStartedEvent.create()]);
    //     expect(call2).toEqual([PurchaseNFTFailedEvent.create('1', 'message')]);
    //     expect(call3).toEqual([ShowPurchaseFailedModalCommand.create('1', '123', 'sellerWallet', 2, 1)]);
    //   });

    it('shows purchase failed modal if no nft data found', async () => {
      // const {invoke, next, store} = mockMiddleware(
      //   purchaseNftForCryptoMiddleware(purchaseApi, walletConnectionService, userDataStorage),
      // );
      // store.getState.mockImplementationOnce(() => ({
      //   'loaded-nfts': {nfts: {}},
      // }));
      // await invoke(PurchaseNFTForCryptoCommand.create('1', '123', 'sellerWallet', 2, 1));
      // expect(next).toBeCalled();
      // expect(store.dispatch).toBeCalledTimes(2);
      // const [call1, call2] = store.dispatch.mock.calls;
      // expect(call1).toEqual([PurchaseNFTFailedEvent.create('1', 'NFT data not found')]);
      // expect(call2).toEqual([ShowPurchaseFailedModalCommand.create('1', '123', 'sellerWallet', 2, 1)]);
    });

    //   it('shows purchase failed modal if no selected wallet found found', async () => {
    //     (walletConnectionService.getSelectedWalletAddress as jest.Mock).mockImplementationOnce(() => {
    //       throw new Error('message');
    //     });
    //     const {invoke, next, store} = mockMiddleware(
    //       purchaseNftForCryptoMiddleware(purchaseApi, walletConnectionService, userDataStorage),
    //     );
    //     store.getState.mockImplementationOnce(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', collectionAddress: 'collectionAddress'}}},
    //     }));
    //     await invoke(PurchaseNFTForCryptoCommand.create('1', '123', 'sellerWallet', 2, 1));
    //     expect(next).toBeCalled();
    //     expect(walletConnectionService.getSelectedWalletAddress).toBeCalled();
    //     expect(purchaseApi.purchaseNft).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(3);
    //     const [call1, call2, call3] = store.dispatch.mock.calls;
    //     expect(call1).toEqual([NFTPurchaseStartedEvent.create()]);
    //     expect(call2).toEqual([PurchaseNFTFailedEvent.create('1', 'message')]);
    //     expect(call3).toEqual([ShowPurchaseFailedModalCommand.create('1', '123', 'sellerWallet', 2, 1)]);
    //   });
    // });
    //
    // describe('purchaseNtForFiatMiddleware', () => {
    //   beforeEach(() => {
    //     window.open = jest.fn();
    //   });
    //
    //   it.skip('opens separate window for fiat payment', async () => {
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', exhibitionId: '123', collectionAddress: 'collectionAddress'}}},
    //       auth: {email: 'email', publicKey: 'key'},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(paymentApi.getFiatPaymentUrl).toBeCalledWith('email', 'address', '123', 'collectionAddress', 1, 123, 'en');
    //     expect(window.open).toBeCalledWith('payment-url', 'Pay by card', 'left=100,top=100,width=800,height=600');
    //     expect(store.dispatch).not.toBeCalled();
    //   });
    //
    //   it('shows an error modal if cannot open payment window', async () => {
    //     (paymentApi.getFiatPaymentUrl as jest.Mock).mockImplementationOnce(() => {
    //       throw new Error('message');
    //     });
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {
    //         nfts: {
    //           1: {
    //             address: 'address',
    //             exhibitionId: '123',
    //             price: 12,
    //             minter: 'sellerWallet',
    //             collectionAddress: 'collectionAddress',
    //           },
    //         },
    //       },
    //       auth: {email: 'email', publicKey: 'key'},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(paymentApi.getFiatPaymentUrl).toBeCalledWith(
    //       'email',
    //       'address',
    //       '123',
    //       'collectionAddress',
    //       1,
    //       123,
    //       'en',
    //       'WINDOW_OPEN',
    //       '1',
    //     );
    //     expect(window.open).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(2);
    //     const [call1, call2] = store.dispatch.mock.calls;
    //     expect(call1).toEqual([PurchaseNFTFailedEvent.create('1', 'message')]);
    //     expect(call2).toEqual([ShowPurchaseFailedModalCommand.create('1', '123', 'sellerWallet', 12, 1)]);
    //   });
    //
    //   it('dispatches an error event if user email was not found', async () => {
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', exhibitionId: '123', price: 12}}},
    //       auth: {email: null, publicKey: 'key'},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(window.open).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'User email not found'));
    //   });
    //
    //   it('dispatches an error event if user public key was not found', async () => {
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', exhibitionId: '123', price: 12}}},
    //       auth: {email: 'email', publicKey: null},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(window.open).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'User public key not found'));
    //   });
    //
    //   it('dispatches an error event if nft data was not found', async () => {
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {}},
    //       auth: {email: 'email', publicKey: 'key'},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(window.open).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'NFT data not found'));
    //   });
    //
    //   it('dispatches an error event if nft is not attached to an event', async () => {
    //     const {invoke, next, store} = mockMiddleware(purchaseNftForFiatMiddleware(paymentApi, userDataStorage));
    //     store.getState.mockImplementation(() => ({
    //       'loaded-nfts': {nfts: {1: {address: 'address', price: 12}}},
    //       auth: {email: 'email', publicKey: 'key'},
    //       locale: 'en',
    //     }));
    //     await invoke(PurchaseNFTForFiatCommand.create('1', '123', 1));
    //     expect(next).toBeCalled();
    //     expect(window.open).not.toBeCalled();
    //     expect(store.dispatch).toBeCalledTimes(1);
    //     expect(store.dispatch).toBeCalledWith(PurchaseNFTFailedEvent.create('1', 'NFT is not assign to an event'));
    //   });
  });
});

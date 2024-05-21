import {NftsApi} from '../../../../api/nfts/NftsApi';
import {mockMiddleware} from '../../../base/store.mock';
import {NftsDocument} from '../../nfts/actions';
import {
  LoadMarketplaceDataCommand,
  MarketplaceFeaturedNftsDocument,
  MarketplaceFeaturedNftsLoadingFailedEvent,
  MarketplaceSecondaryNftsDocument,
  MarketplaceSecondaryNftsLoadingFailedEvent,
} from '../actions';
import {loadMarketplaceDataMiddleware} from '../middlewares';

describe('Marketplace page middlewares', () => {
  let nftApi: NftsApi;

  beforeEach(() => {
    nftApi = {
      getSecondaryFeaturedNfts: jest.fn(() => Promise.resolve('featured-nfts')),
      getSecondaryNfts: jest.fn(() => Promise.resolve('page-nfts')),
    } as any;
  });

  describe('loadMarketplaceDataMiddleware', () => {
    it('loads marketplace page data', async () => {
      const {invoke, store, next} = mockMiddleware(loadMarketplaceDataMiddleware(nftApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadMarketplaceDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('featured-nfts' as any)],
          [NftsDocument.create('page-nfts' as any)],
          [MarketplaceFeaturedNftsDocument.create('featured-nfts' as any)],
          [MarketplaceSecondaryNftsDocument.create('page-nfts' as any)],
        ]),
      );
    });

    it('dispatches an error if featured nfts loading failed', async () => {
      (nftApi.getSecondaryFeaturedNfts as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, store, next} = mockMiddleware(loadMarketplaceDataMiddleware(nftApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadMarketplaceDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [MarketplaceFeaturedNftsLoadingFailedEvent.create('message')],
          [NftsDocument.create('page-nfts' as any)],
          [MarketplaceSecondaryNftsDocument.create('page-nfts' as any)],
        ]),
      );
    });

    it('dispatches an error if collectable nfts loading failed', async () => {
      (nftApi.getSecondaryNfts as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, store, next} = mockMiddleware(loadMarketplaceDataMiddleware(nftApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadMarketplaceDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [MarketplaceSecondaryNftsLoadingFailedEvent.create('message')],
          [NftsDocument.create('featured-nfts' as any)],
          [MarketplaceFeaturedNftsDocument.create('featured-nfts' as any)],
        ]),
      );
    });

    it('dispatches an error if featured creators loading failed', async () => {
      const {invoke, store, next} = mockMiddleware(loadMarketplaceDataMiddleware(nftApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadMarketplaceDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('featured-nfts' as any)],
          [NftsDocument.create('page-nfts' as any)],
          [MarketplaceFeaturedNftsDocument.create('featured-nfts' as any)],
          [MarketplaceSecondaryNftsDocument.create('page-nfts' as any)],
        ]),
      );
    });
  });
});

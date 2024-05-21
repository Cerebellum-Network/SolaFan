import {ICreatorsApi} from '../../../../api/creators/ICreatorsApi';
import {IEventsApi} from '../../../../api/events/IEventsApi';
import {IHomePageNftsApi} from '../../../../api/home-page/IHomePageNftsApi';
import {mockMiddleware} from '../../../base/store.mock';
import {RedirectCommand} from '../../navigation/actions';
import {NftsDocument} from '../../nfts/actions';
import {
  BannerItemsDocument,
  BannerItemsLoadingFailedEvent,
  ConnectWalletClickEvent,
  FeaturedCreatorsDocument,
  FeaturedCreatorsLoadingFailedEvent,
  FeaturedEventsDocument,
  FeaturedEventsLoadingFailedEvent,
  FeaturedNftsDocument,
  FeaturedNftsLoadingFailedEvent,
  LoadHomePageDataCommand,
  NftCollectablesDocument,
  NftsCollectablesLoadingFailedEvent,
  SellNftsClickEvent,
  // ShowConnectYourWalletDialogCommand,
} from '../actions';
import {getStartedEventsMiddleware, loadHomePageDataMiddleware} from '../middlewares';

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
describe('home-page middleware', () => {
  let homePageNftsApi: IHomePageNftsApi;
  let creatorsApi: ICreatorsApi;
  let eventsApi: IEventsApi;

  beforeEach(() => {
    homePageNftsApi = {
      getBannerItems: jest.fn(() => Promise.resolve('banner-items')),
      getFeaturedNfts: jest.fn(() => Promise.resolve('featured-nfts')),
      getPageNfts: jest.fn(() => Promise.resolve('page-nfts')),
    } as any;
    creatorsApi = {
      getFeaturedCreators: jest.fn(() => Promise.resolve('creators')),
    } as any;
    eventsApi = {
      getFeaturedEvents: jest.fn(() => Promise.resolve('events')),
    } as any;
  });

  describe('loadHomePageDataMiddleware', () => {
    it('loads home page data', async () => {
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(7);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('page-nfts' as any)],
          [NftCollectablesDocument.create('page-nfts' as any)],
          [NftsDocument.create('featured-nfts' as any)],
          [FeaturedNftsDocument.create('featured-nfts' as any)],
          [BannerItemsDocument.create('banner-items' as any)],
          [FeaturedCreatorsDocument.create('creators' as any)],
          [FeaturedEventsDocument.create('events' as any)],
        ]),
      );
    });

    it('dispatches an error if page nfts loading failed', async () => {
      (homePageNftsApi.getPageNfts as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(6);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsCollectablesLoadingFailedEvent.create('message')],
          [NftsDocument.create('featured-nfts' as any)],
          [FeaturedNftsDocument.create('featured-nfts' as any)],
          [BannerItemsDocument.create('banner-items' as any)],
          [FeaturedCreatorsDocument.create('creators' as any)],
          [FeaturedEventsDocument.create('events' as any)],
        ]),
      );
    });

    it('dispatches an error if featured nfts loading failed', async () => {
      (homePageNftsApi.getFeaturedNfts as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(6);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('page-nfts' as any)],
          [NftCollectablesDocument.create('page-nfts' as any)],
          [FeaturedNftsLoadingFailedEvent.create('message')],
          [BannerItemsDocument.create('banner-items' as any)],
          [FeaturedCreatorsDocument.create('creators' as any)],
          [FeaturedEventsDocument.create('events' as any)],
        ]),
      );
    });

    it('dispatches an error if banner items loading failed', async () => {
      (homePageNftsApi.getBannerItems as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(7);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('page-nfts' as any)],
          [NftCollectablesDocument.create('page-nfts' as any)],
          [NftsDocument.create('featured-nfts' as any)],
          [FeaturedNftsDocument.create('featured-nfts' as any)],
          [BannerItemsLoadingFailedEvent.create('message')],
          [FeaturedCreatorsDocument.create('creators' as any)],
          [FeaturedEventsDocument.create('events' as any)],
        ]),
      );
    });

    it('dispatches an error if featured creators loading failed', async () => {
      (creatorsApi.getFeaturedCreators as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(7);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('page-nfts' as any)],
          [NftCollectablesDocument.create('page-nfts' as any)],
          [NftsDocument.create('featured-nfts' as any)],
          [FeaturedNftsDocument.create('featured-nfts' as any)],
          [BannerItemsDocument.create('banner-items' as any)],
          [FeaturedCreatorsLoadingFailedEvent.create('message')],
          [FeaturedEventsDocument.create('events' as any)],
        ]),
      );
    });

    it('dispatches an error if featured events loading failed', async () => {
      (eventsApi.getFeaturedEvents as jest.Mock).mockImplementation(async () => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadHomePageDataMiddleware(homePageNftsApi, creatorsApi, eventsApi));
      store.getState.mockImplementation(() => ({
        locale: 'en',
      }));
      await invoke(LoadHomePageDataCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(7);
      expect(store.dispatch.mock.calls).toEqual(
        expect.arrayContaining([
          [NftsDocument.create('page-nfts' as any)],
          [NftCollectablesDocument.create('page-nfts' as any)],
          [NftsDocument.create('featured-nfts' as any)],
          [FeaturedNftsDocument.create('featured-nfts' as any)],
          [BannerItemsDocument.create('banner-items' as any)],
          [FeaturedCreatorsDocument.create('creators' as any)],
          [FeaturedEventsLoadingFailedEvent.create('message')],
        ]),
      );
    });
  });

  describe('getStartedEventsMiddleware', () => {
    it('SellNftsClickEvent', async () => {
      const {invoke, next, store} = mockMiddleware(getStartedEventsMiddleware());

      store.getState.mockImplementation(() => ({
        auth: {
          email: null,
        },
        locale: 'en',
      }));
      await invoke(SellNftsClickEvent.create());

      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      const [call1] = store.dispatch.mock.calls;
      expect(call1).toEqual([RedirectCommand.create('/en/home/user/nfts')]);
    });

    // it('ConnectWalletClickEvent for auth user', async () => {
    //   const {invoke, next, store} = mockMiddleware(getStartedEventsMiddleware());
    //
    //   store.getState.mockImplementation(() => ({
    //     auth: {
    //       email: 'test.email@gmail.com',
    //     },
    //     locale: 'en',
    //   }));
    //   await invoke(ConnectWalletClickEvent.create());
    //
    //   expect(next).toBeCalled();
    //   expect(store.dispatch).toBeCalledTimes(1);
    //   const [call1] = store.dispatch.mock.calls;
    //   expect(call1).toEqual([ShowConnectYourWalletDialogCommand.create()]);
    // });

    it('ConnectWalletClickEvent for not auth user', async () => {
      const {invoke, next, store} = mockMiddleware(getStartedEventsMiddleware());

      store.getState.mockImplementation(() => ({
        auth: {
          email: null,
        },
        locale: 'en',
      }));
      await invoke(ConnectWalletClickEvent.create());

      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      const [call1] = store.dispatch.mock.calls;
      expect(call1).toEqual([RedirectCommand.create('/en/home/auth/signin')]);
    });
  });
});

import {
  BannerItemsDocument,
  FeaturedCreatorsDocument,
  FeaturedEventsDocument,
  FeaturedNftsDocument,
  NftCollectablesDocument,
} from '../actions';
import {
  bannerItemsReducer,
  featuredCreatorsReducer,
  featuredEventsReducer,
  featuredNftsReducer,
  homePageNftCollectablesReducer,
  loadingStateReducer,
} from '../reducers';

describe('Home page reducers', () => {
  describe('loadingStateReducer', () => {
    it('returns default state', () => {
      expect(loadingStateReducer(undefined, {} as any)).toEqual({
        collectablesLoading: true,
        featuredLoading: true,
        bannerLoading: true,
        creatorsLoading: true,
        eventsLoading: true,
      });
    });

    it('sets loading state for collectable nfts', () => {
      expect(loadingStateReducer(undefined, NftCollectablesDocument.create('nfts' as any))).toEqual({
        collectablesLoading: false,
        featuredLoading: true,
        bannerLoading: true,
        creatorsLoading: true,
        eventsLoading: true,
      });
    });

    it('sets loading state for featured nfts', () => {
      expect(loadingStateReducer(undefined, FeaturedNftsDocument.create('nfts' as any))).toEqual({
        collectablesLoading: true,
        featuredLoading: false,
        bannerLoading: true,
        creatorsLoading: true,
        eventsLoading: true,
      });
    });

    it('sets loading state for banner items', () => {
      expect(loadingStateReducer(undefined, BannerItemsDocument.create('items' as any))).toEqual({
        collectablesLoading: true,
        featuredLoading: true,
        bannerLoading: false,
        creatorsLoading: true,
        eventsLoading: true,
      });
    });

    it('sets loading state for featured creators', () => {
      expect(loadingStateReducer(undefined, FeaturedCreatorsDocument.create('creators' as any))).toEqual({
        collectablesLoading: true,
        featuredLoading: true,
        bannerLoading: true,
        creatorsLoading: false,
        eventsLoading: true,
      });
    });

    it('sets loading state for featured events', () => {
      expect(loadingStateReducer(undefined, FeaturedEventsDocument.create('events' as any))).toEqual({
        collectablesLoading: true,
        featuredLoading: true,
        bannerLoading: true,
        creatorsLoading: true,
        eventsLoading: false,
      });
    });
  });

  describe('homePageNftCollectablesReducer', () => {
    it('returns default state', () => {
      expect(homePageNftCollectablesReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves collectable nfts ids', () => {
      expect(homePageNftCollectablesReducer([], NftCollectablesDocument.create([{id: '1'}, {id: '2'}] as any))).toEqual(
        ['1', '2'],
      );
    });
  });

  describe('featuredNftsReducer', () => {
    it('returns default state', () => {
      expect(featuredNftsReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves featured nfts ids', () => {
      expect(featuredNftsReducer([], FeaturedNftsDocument.create([{id: '1'}, {id: '2'}] as any))).toEqual(['1', '2']);
    });
  });

  describe('bannerItemsReducer', () => {
    it('returns default state', () => {
      expect(bannerItemsReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves banner items', () => {
      expect(bannerItemsReducer([], BannerItemsDocument.create('items' as any))).toEqual('items');
    });
  });

  describe('featuredCreatorsReducer', () => {
    it('returns default state', () => {
      expect(featuredCreatorsReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves featured creators', () => {
      expect(featuredCreatorsReducer([], FeaturedCreatorsDocument.create('creators' as any))).toEqual('creators');
    });
  });

  describe('featuredEventsReducer', () => {
    it('returns default state', () => {
      expect(featuredEventsReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves featured creators', () => {
      expect(featuredEventsReducer([], FeaturedEventsDocument.create('events' as any))).toEqual('events');
    });
  });
});

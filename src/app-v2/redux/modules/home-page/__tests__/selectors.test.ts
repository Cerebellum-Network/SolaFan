import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {
  selectBannerItems,
  selectCollectableNftsIds,
  selectFeaturedCreators,
  selectFeaturedEvents,
  selectFeaturedNftsIds,
  selectHomePageData,
  selectHomePageLoadingState,
} from '../selectors';

describe('Home page selectors', () => {
  describe('selectHomePageData', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectHomePageData({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectHomePageData({'home-page': 'data'} as any)).toEqual('data');
    });
  });

  describe('selectCollectableNftsIds', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectCollectableNftsIds({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectCollectableNftsIds({'home-page': {collectables: 'data'}} as any)).toEqual('data');
    });
  });

  describe('selectFeaturedNftsIds', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectFeaturedNftsIds({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectFeaturedNftsIds({'home-page': {featuredNfts: 'data'}} as any)).toEqual('data');
    });
  });

  describe('selectBannerItems', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectBannerItems({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectBannerItems({'home-page': {bannerItems: 'data'}} as any)).toEqual('data');
    });
  });

  describe('selectFeaturedCreators', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectFeaturedCreators({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectFeaturedCreators({'home-page': {featuredCreators: 'data'}} as any)).toEqual('data');
    });
  });

  describe('selectFeaturedEvents', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectFeaturedEvents({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectFeaturedEvents({'home-page': {featuredEvents: 'data'}} as any)).toEqual('data');
    });
  });

  describe('selectHomePageLoadingState', () => {
    it('throws an error if the module is not connected', () => {
      expect(() => selectHomePageLoadingState({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns home page data', () => {
      expect(selectHomePageLoadingState({'home-page': {loadingState: 'data'}} as any)).toEqual('data');
    });
  });
});

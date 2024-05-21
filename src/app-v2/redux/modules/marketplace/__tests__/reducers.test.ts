import {MarketplaceFeaturedNftsDocument, MarketplaceSecondaryNftsDocument} from '../actions';
import {
  marketplaceFeaturedNftsReducer,
  marketplaceLoadingStateReducer,
  marketplaceNftCollectablesReducer,
} from '../reducers';

describe('Marketplace reducers', () => {
  describe('marketplaceLoadingStateReducer', () => {
    it('returns default state', () => {
      expect(marketplaceLoadingStateReducer(undefined, {} as any)).toEqual({
        featuredNftsLoading: true,
        collectableNftsLoading: true,
      });
    });

    it('changes featured nfts loading state', () => {
      expect(marketplaceLoadingStateReducer(undefined, MarketplaceFeaturedNftsDocument.create('nfts' as any))).toEqual({
        featuredNftsLoading: false,
        collectableNftsLoading: true,
      });
    });

    it('changes collectable nfts loading state', () => {
      expect(marketplaceLoadingStateReducer(undefined, MarketplaceSecondaryNftsDocument.create('nfts' as any))).toEqual(
        {
          featuredNftsLoading: true,
          collectableNftsLoading: false,
        },
      );
    });
  });

  describe('marketplaceFeaturedNftsReducer', () => {
    it('returns default state', () => {
      expect(marketplaceFeaturedNftsReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves featured nfts ids', () => {
      expect(
        marketplaceFeaturedNftsReducer([], MarketplaceFeaturedNftsDocument.create([{id: '1'}, {id: '2'}] as any)),
      ).toEqual(['1', '2']);
    });
  });

  describe('marketplaceNftCollectablesReducer', () => {
    it('returns default state', () => {
      expect(marketplaceNftCollectablesReducer(undefined, {} as any)).toEqual([]);
    });

    it('saves featured nfts ids', () => {
      expect(
        marketplaceNftCollectablesReducer([], MarketplaceSecondaryNftsDocument.create([{id: '1'}, {id: '2'}] as any)),
      ).toEqual(['1', '2']);
    });
  });
});

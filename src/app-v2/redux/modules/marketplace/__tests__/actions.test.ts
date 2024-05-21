import {
  LoadMarketplaceDataCommand,
  MarketplaceFeaturedNftsDocument,
  MarketplaceFeaturedNftsLoadingFailedEvent,
  MarketplaceSecondaryNftsDocument,
  MarketplaceSecondaryNftsLoadingFailedEvent,
} from '../actions';

describe('Marketplace actions', () => {
  it('creates a command to load MARKETPLACE data', () => {
    expect(LoadMarketplaceDataCommand.create()).toEqual({
      type: '[MARKETPLACE] Load data',
    });
  });

  it('creates featured nfts document', () => {
    expect(MarketplaceFeaturedNftsDocument.create('nfts' as any)).toEqual({
      type: '[MARKETPLACE] Featured NFTs',
      payload: 'nfts',
    });
  });

  it('creates collectable nfts document', () => {
    expect(MarketplaceSecondaryNftsDocument.create('nfts' as any)).toEqual({
      type: '[MARKETPLACE] Secondary NFTs',
      payload: 'nfts',
    });
  });

  it('creates featured nfts loading failed event', () => {
    expect(MarketplaceFeaturedNftsLoadingFailedEvent.create('message')).toEqual({
      type: '[MARKETPLACE] Featured NFTs loading failed',
      payload: 'message',
    });
  });

  it('creates collectable nfts loading failed event', () => {
    expect(MarketplaceSecondaryNftsLoadingFailedEvent.create('message')).toEqual({
      type: '[MARKETPLACE] Secondary NFTs loading failed',
      payload: 'message',
    });
  });
});

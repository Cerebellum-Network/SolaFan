import {ConnectWalletDialog} from '../../../../components/connected/ConnectWalletDialog';
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
  ShowConnectYourWalletDialogCommand,
} from '../actions';

describe('Home page actions', () => {
  it('creates a command to load page data', () => {
    expect(LoadHomePageDataCommand.create()).toEqual({
      type: '[HOME] Load page data',
    });
  });

  it('creates banner items document', () => {
    expect(BannerItemsDocument.create('items' as any)).toEqual({
      type: '[HOME] Banner items document',
      payload: 'items',
    });
  });

  it('creates featured nfts document', () => {
    expect(FeaturedNftsDocument.create('nfts' as any)).toEqual({
      type: '[HOME] Featured NFTs document',
      payload: 'nfts',
    });
  });

  it('creates nft collectables document', () => {
    expect(NftCollectablesDocument.create('nfts' as any)).toEqual({
      type: '[HOME] NFT collectables document',
      payload: 'nfts',
    });
  });

  it('creates featured creators document', () => {
    expect(FeaturedCreatorsDocument.create('creators' as any)).toEqual({
      type: '[HOME] Featured creators document',
      payload: 'creators',
    });
  });

  it('creates featured event document', () => {
    expect(FeaturedEventsDocument.create('events' as any)).toEqual({
      type: '[HOME] Featured events document',
      payload: 'events',
    });
  });

  it('creates banner items loading failed event', () => {
    expect(BannerItemsLoadingFailedEvent.create('message')).toEqual({
      type: '[HOME] Banner items loading failed',
      payload: 'message',
    });
  });

  it('creates featured nfts loading failed event', () => {
    expect(FeaturedNftsLoadingFailedEvent.create('message')).toEqual({
      type: '[HOME] Featured NFTs loading failed',
      payload: 'message',
    });
  });

  it('creates collectable nfts loading failed event', () => {
    expect(NftsCollectablesLoadingFailedEvent.create('message')).toEqual({
      type: '[HOME] Collectable NFTs loading failed',
      payload: 'message',
    });
  });

  it('creates featured creators loading failed event', () => {
    expect(FeaturedCreatorsLoadingFailedEvent.create('message')).toEqual({
      type: '[HOME] Featured creators loading failed',
      payload: 'message',
    });
  });

  it('creates featured events loading failed event', () => {
    expect(FeaturedEventsLoadingFailedEvent.create('message')).toEqual({
      type: '[HOME] Featured events loading failed',
      payload: 'message',
    });
  });

  it('SellNftsClickEvent', () => {
    expect(SellNftsClickEvent.create()).toEqual({
      type: '[HOME] Get Started sellNfts click',
      payload: null,
    });
  });

  it('ConnectWalletClickEvent', () => {
    expect(ConnectWalletClickEvent.create()).toEqual({
      type: '[HOME] Get Started connect wallet click',
      payload: null,
    });
  });

  it('Show connect your wallet dialog command', () => {
    expect(ShowConnectYourWalletDialogCommand.create()).toEqual({
      type: '[MODAL] Show connect your wallet dialog',
      payload: null,
      component: ConnectWalletDialog,
    });
  });
});

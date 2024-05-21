import {ShareNftModal} from '../../../../components/connected/ShareNftModal';
import {
  AddManyNftsCommand,
  LoadAllNftsCommand,
  LoadNftByIdCommand,
  NftDocument,
  NftsDocument,
  ShowShareNftModalCommand,
  UpdateNftCommand,
} from '../actions';

describe('nfts actions', () => {
  it('creates load nft by id command', () => {
    expect(LoadNftByIdCommand.create('1')).toEqual({
      type: '[NFTS] Load NFT by id',
      payload: '1',
    });
  });

  it('creates load all nfts command', () => {
    expect(LoadAllNftsCommand.create()).toEqual({
      type: '[NFTS] Load all NFTs',
    });
  });

  it('creates add many nfts command', () => {
    expect(AddManyNftsCommand.create('data' as any)).toEqual({
      type: '[NFTS] Add many NFT',
      payload: 'data',
    });
  });

  it('creates update nft command', () => {
    expect(UpdateNftCommand.create('1', 'data' as any)).toEqual({
      type: '[NFTS] Update NFT',
      payload: {
        id: '1',
        partialNftData: 'data',
      },
    });
  });

  it('creates nft document', () => {
    expect(NftDocument.create('nft' as any)).toEqual({
      type: '[NFTS] NFT document',
      payload: 'nft',
    });
  });

  it('creates nfts document', () => {
    expect(NftsDocument.create('nfts' as any)).toEqual({
      type: '[NFTS] NFTs document',
      payload: 'nfts',
    });
  });

  it('creates a command to show share nft modal', () => {
    expect(ShowShareNftModalCommand.create('1')).toEqual({
      type: '[MODAL] Share',
      payload: {nftId: '1'},
      component: ShareNftModal,
    });
  });
});

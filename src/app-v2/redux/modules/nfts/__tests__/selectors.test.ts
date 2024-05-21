import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectNftById} from '../selectors';

describe('nft selectors', () => {
  describe('selectNftById', () => {
    it('selects nft from the store by id', () => {
      const store = {
        'loaded-nfts': {
          ids: ['1'],
          nfts: {
            '1': 'nft',
          },
        },
      };

      expect(selectNftById(store as any, '1')).toEqual('nft');
    });

    it('throws an error if loaded-nfts is not found', () => {
      expect(() => selectNftById({} as any, '1')).toThrow(NoSuchModuleError);
    });
  });
});

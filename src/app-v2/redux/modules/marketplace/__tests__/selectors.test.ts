import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectMarketplaceState} from '../selectors';

describe('Marketplace selectors', () => {
  describe('selectMarketplaceData', () => {
    it('trows an error if module is not connected', () => {
      expect(() => selectMarketplaceState({} as any)).toThrow(NoSuchModuleError);
    });

    it('returns module data', () => {
      expect(selectMarketplaceState({marketplace: {data: 'data'}} as any)).toEqual({
        data: 'data',
      });
    });
  });
});

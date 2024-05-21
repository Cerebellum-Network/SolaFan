import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectAllCreators, selectCreatorsLoading} from '../selectors';

describe('Creators selectors', () => {
  const store = {
    creators: {
      allCreators: {
        ids: ['creator1', 'creator2'],
        creators: {creator1: 'creator1', creator2: 'creator2'},
      },
      loading: true,
    },
  };
  describe('selectAllCreators', () => {
    it('returns all creators', () => {
      expect(selectAllCreators(store as any)).toEqual(['creator1', 'creator2']);
    });
    it('throws an error if no creators module defined', () => {
      expect(() => selectAllCreators({} as any)).toThrow(NoSuchModuleError);
    });
  });

  describe('selectCreatorsLoading', () => {
    it('returns creators loading state', () => {
      expect(selectCreatorsLoading(store as any)).toEqual(true);
    });
    it('throws an error if no creators module defined', () => {
      expect(() => selectCreatorsLoading({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectExhibitsLoadingState, selectExhibitsPage} from '../selectors';

describe('Exhibits selectors', () => {
  const store = {'exhibits-page': {exhibits: ['exhibits1', 'exhibits2'], loading: true}};
  describe('selectAllExhibits', () => {
    it('returns all exhibits', () => {
      expect(selectExhibitsPage(store as any)).toEqual(['exhibits1', 'exhibits2']);
    });
    it('throws an error if no creators module defined', () => {
      expect(() => selectExhibitsPage({} as any)).toThrow(NoSuchModuleError);
    });
  });

  describe('selectExhibitsLoading', () => {
    it('throws an error if no creators module defined', () => {
      expect(() => selectExhibitsLoadingState({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

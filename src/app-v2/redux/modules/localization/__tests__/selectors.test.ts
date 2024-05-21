import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectCurrentLocale} from '../selectors';

describe('localization selectors', () => {
  describe('selectCurrentLocale', () => {
    it('returns user locale', () => {
      expect(selectCurrentLocale({locale: 'locale'})).toEqual('locale');
    });

    it('throws an error if module is not connected', () => {
      expect(() => selectCurrentLocale({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

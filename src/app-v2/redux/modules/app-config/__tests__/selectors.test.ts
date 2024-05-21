import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectAppConfig} from '../selectors';

describe('app config selectors', () => {
  describe('selectAppConfig', () => {
    it('returns app config', () => {
      expect(selectAppConfig({'app-config': {config: 'config'}} as any)).toEqual('config');
    });

    it('throws an error if module is not connected', () => {
      expect(() => selectAppConfig({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

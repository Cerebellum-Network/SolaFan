import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectHistoryObject} from '../selectors';

describe('navigation selectors', () => {
  describe('selectHistoryObject', () => {
    it('returns history object', () => {
      expect(selectHistoryObject({navigation: 'history'} as any)).toEqual('history');
    });

    it('throws an error if module was not added', () => {
      expect(() => selectHistoryObject({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

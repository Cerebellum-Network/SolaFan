import {UserLocaleDocument} from '../actions';
import {userLocaleReducer} from '../reducers';

describe('localization reducers', () => {
  describe('userLocaleReducer', () => {
    it('returns null as default state', () => {
      expect(userLocaleReducer(undefined, {} as any)).toEqual(null);
    });

    it('sets user locale', () => {
      expect(userLocaleReducer(null, UserLocaleDocument.create('locale'))).toEqual('locale');
    });

    it('returns saved locale', () => {
      expect(userLocaleReducer('locale', {} as any)).toEqual('locale');
    });
  });
});

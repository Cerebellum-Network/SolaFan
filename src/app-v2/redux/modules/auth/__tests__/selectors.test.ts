import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectUserEmail} from '../selectors';

describe('auth selectors', () => {
  describe('selectUserEmail', () => {
    it('returns user email', () => {
      expect(
        selectUserEmail({
          // @ts-ignore
          auth: {authPending: false, authError: undefined, userData: {email: 'email', publicKey: 'key'}},
        }),
      ).toEqual('email');
    });

    it('throws an error if auth module is not found', () => {
      expect(() => selectUserEmail({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

import {
  ResendOTPFailedEvent,
  UserDataDocument,
  UserSignInFailedEvent,
  VerifyEmailOTPCommand,
  VerifyOTPFailedEvent,
} from '../actions';
import {authErrorReducer, authPendingReducer, userDataReducer} from '../reducers';

describe('auth reducers', () => {
  describe('userDataReducer', () => {
    it('saves user data', () => {
      expect(userDataReducer(null, UserDataDocument.create('data' as any))).toEqual('data');
    });

    it('clears user data', () => {
      expect(userDataReducer('data' as any, UserDataDocument.create(null))).toEqual(null);
    });

    it('returns user data', () => {
      expect(userDataReducer('data' as any, {type: 'type'})).toEqual('data');
    });
  });

  describe('authErrorReducer', () => {
    it('returns error on VerifyOTPFailedEvent command', () => {
      expect(authErrorReducer(undefined, VerifyOTPFailedEvent.create('error'))).toEqual('error');
    });

    it('returns error on ResendOTPFailedEvent command', () => {
      expect(authErrorReducer(undefined, ResendOTPFailedEvent.create('error'))).toEqual('error');
    });

    it('clears error on UserDataDocument command', () => {
      expect(authErrorReducer('error' as any, UserDataDocument.create('data' as any))).toEqual(null);
    });
  });

  describe('authPendingReducer', () => {
    it('returns true on SignInWithEmailCommand command', () => {
      expect(authPendingReducer(undefined, VerifyEmailOTPCommand.create('test'))).toEqual(true);
    });

    it('returns false on UserSignInFailedEvent command', () => {
      expect(authPendingReducer(undefined, UserSignInFailedEvent.create('test'))).toEqual(false);
    });
  });
});

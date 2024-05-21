import {SupportedAuthProviders} from '../../../../models/auth/types';
import {
  ClearUserDataCommand,
  ResendOTPCommand,
  ResendOTPFailedEvent,
  RestoreUserDataCommand,
  SignInWithEmailCommand,
  SignInWithSocialCommand,
  UserDataDocument,
  UserDataRestorationFailedEvent,
  UserDataRestoredEvent,
  UserSignedInWithEmailEvent,
  UserSignedInWithSocialEvent,
  UserSignInFailedEvent,
  VerifyEmailOTPCommand,
  VerifyOtpCommand,
  VerifyOTPFailedEvent,
  VerifyOTPSuccessEvent,
  VerifySocialOTPCommand,
} from '../actions';

describe('auth actions', () => {
  it('creates restore user data command', () => {
    expect(RestoreUserDataCommand.create()).toEqual({type: '[AUTH] Restore user data'});
  });

  it('creates user data restored event', () => {
    expect(UserDataRestoredEvent.create()).toEqual({type: '[AUTH] User data restored'});
  });

  it('creates user data restoration failed event', () => {
    expect(UserDataRestorationFailedEvent.create('test')).toEqual({
      type: '[AUTH] User data restoration failed',
      payload: 'test',
    });
  });

  it('creates sign in with email command', () => {
    expect(SignInWithEmailCommand.create('test')).toEqual({
      type: '[AUTH] Sign in with email',
      payload: 'test',
    });
  });

  it('creates user signed in with email event', () => {
    expect(UserSignedInWithEmailEvent.create('test')).toEqual({
      type: '[AUTH] User signed in with email',
      payload: 'test',
    });
  });

  it('creates sign in with social command', () => {
    expect(SignInWithSocialCommand.create(SupportedAuthProviders.Twitter)).toEqual({
      type: '[AUTH] Sign in with social',
      payload: SupportedAuthProviders.Twitter,
    });
  });

  it('creates user signed in with social event', () => {
    expect(UserSignedInWithSocialEvent.create('test' as any)).toEqual({
      type: '[AUTH] User signed in with social',
      payload: 'test',
    });
  });

  it('creates a command to verify OTP code', () => {
    expect(VerifyOtpCommand.create('code')).toEqual({
      type: '[AUTH] Verify OTP',
      payload: 'code',
    });
  });

  it('creates verify OTP code event', () => {
    expect(VerifyOTPFailedEvent.create('test')).toEqual({
      type: '[AUTH] Verify OTP failed',
      payload: 'test',
    });
  });

  it('creates verify email OTP command', () => {
    expect(VerifyEmailOTPCommand.create('code')).toEqual({
      type: '[AUTH] Verify email OTP',
      payload: 'code',
    });
  });

  it('creates verify social OTP command', () => {
    expect(VerifySocialOTPCommand.create('code')).toEqual({
      type: '[AUTH] Verify social OTP',
      payload: 'code',
    });
  });

  it('creates verify OTP success event', () => {
    expect(VerifyOTPSuccessEvent.create('data' as any)).toEqual({
      type: '[AUTH] Verify OTP success',
      payload: 'data',
    });
  });

  it('creates user sign in failed event', () => {
    expect(UserSignInFailedEvent.create('test')).toEqual({
      type: '[AUTH] User sign in failed',
      payload: 'test',
    });
  });

  it('creates a command to resend OTP code', () => {
    expect(ResendOTPCommand.create()).toEqual({
      type: '[AUTH] Resend OTP code',
    });
  });

  it('creates resend otp failed event', () => {
    expect(ResendOTPFailedEvent.create('test')).toEqual({
      type: '[AUTH] Resend OTP code failed',
      payload: 'test',
    });
  });

  it('creates user data document', () => {
    expect(UserDataDocument.create('data' as any)).toEqual({
      type: '[AUTH] User data',
      payload: 'data',
    });
  });

  it('creates clear user data command', () => {
    expect(ClearUserDataCommand.create()).toEqual({
      type: '[AUTH] Clear user data',
    });
  });
});

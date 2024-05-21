import {AuthProviderNotSupportedError} from '../../errors/AuthProviderNotSupportedError';
import {SupportedAuthProviders} from '../../types';
import {AppleAuthProvider} from '../AppleAuthProvider';
import {AuthProvidersFactory} from '../AuthProvidersFactory';
import {FacebookAuthProvider} from '../FacebookAuthProvider';
import {GoogleAuthProvider} from '../GoogleAuthProvider';
import {TwitterAuthProvider} from '../TwitterAuthProvider';

describe('AuthProvidersFactory', () => {
  const factory = new AuthProvidersFactory();

  it('creates google.com auth provider', () => {
    expect(factory.createProvider(SupportedAuthProviders.Google) instanceof GoogleAuthProvider).toBeTruthy();
  });

  it('creates facebook.com auth provider', () => {
    expect(factory.createProvider(SupportedAuthProviders.Facebook) instanceof FacebookAuthProvider).toBeTruthy();
  });

  it('creates apple.com auth provider', () => {
    expect(factory.createProvider(SupportedAuthProviders.Apple) instanceof AppleAuthProvider).toBeTruthy();
  });

  it('creates twitter.com auth provider', () => {
    expect(factory.createProvider(SupportedAuthProviders.Twitter) instanceof TwitterAuthProvider).toBeTruthy();
  });

  it('throws an error in case of unknown provider', () => {
    expect(() => factory.createProvider('test' as any)).toThrow(AuthProviderNotSupportedError);
  });
});

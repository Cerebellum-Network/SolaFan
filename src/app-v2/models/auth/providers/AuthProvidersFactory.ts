import {AuthProviderNotSupportedError} from '../errors/AuthProviderNotSupportedError';
import {SupportedAuthProviders} from '../types';
import {AppleAuthProvider} from './AppleAuthProvider';
import {FacebookAuthProvider} from './FacebookAuthProvider';
import {GoogleAuthProvider} from './GoogleAuthProvider';
import {IAuthProvider} from './IAuthProvider';
import {TwitterAuthProvider} from './TwitterAuthProvider';

export class AuthProvidersFactory {
  createProvider(source: SupportedAuthProviders): IAuthProvider {
    switch (source) {
      case SupportedAuthProviders.Google:
        return new GoogleAuthProvider();
      case SupportedAuthProviders.Facebook:
        return new FacebookAuthProvider();
      case SupportedAuthProviders.Apple:
        return new AppleAuthProvider();
      case SupportedAuthProviders.Twitter:
        return new TwitterAuthProvider();
      default:
        throw new AuthProviderNotSupportedError(source);
    }
  }
}

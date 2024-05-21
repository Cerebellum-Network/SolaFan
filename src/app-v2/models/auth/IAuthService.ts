import {SocialUserData, SupportedAuthProviders} from './types';

export interface IAuthService {
  signInWithSocial(providerType: SupportedAuthProviders): Promise<SocialUserData>;
  signInOrAttachEmail(email: string, locale: string): Promise<void>;
}

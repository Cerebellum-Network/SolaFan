import {ENV, FACEBOOK_PIXEL_ID} from '../../../config/common';
import {ProviderInterface, User} from './provider-interface';

declare global {
  interface Window {
    fbq: any;
  }
}

export class FacebookProvider implements ProviderInterface {
  constructor() {
    window.fbq?.('init', FACEBOOK_PIXEL_ID);
    window.fbq?.('track', 'PageView');
  }

  init(): void {}

  track(eventName: string, metadata: any): void {
    window.fbq?.('trackCustom', eventName, {env: ENV, ...metadata});
  }

  identify({email}: User) {
    if (email) {
      window.fbq?.('init', FACEBOOK_PIXEL_ID, {
        em: email,
      });
    }
  }
}

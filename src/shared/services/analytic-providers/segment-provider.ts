import {ENV} from '../../../config/common';
import {ProviderInterface, User} from './provider-interface';

declare global {
  interface Window {
    analytics: {
      track(eventName: string, metadata: unknown): void;
      identify(userId: string, traits: Record<string, unknown>): void;
    };
  }
}

export class SegmentProvider implements ProviderInterface {
  constructor(public readonly sessionId: string) {}

  init(): void {}

  track(eventName: string, metadata: any): void {
    window.analytics.track(eventName, {env: ENV, ...metadata});
  }

  identify({email}: User, metadata?: Record<string, string | number>) {
    if (!email) {
      return; //not track not registered users(guests)
    }
    const userMetadata = {
      email,
      ...metadata,
    };

    window.analytics.identify(email, userMetadata); //track registered users only
  }
}

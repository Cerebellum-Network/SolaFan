// import {APP_ID, ENV} from '../../../config/common';
import {ProviderInterface} from './provider-interface';

// const userAgent = navigator.userAgent;

export class CereProvider implements ProviderInterface {
  // private readonly cereSdk: CereSDK | null = null;

  constructor(public readonly sessionId: string) {
    // this.cereSdk = cereWebSDK(APP_ID(), this.sessionId, {deployment: ENV});
  }

  init(): void {}

  track(eventName: string, metadata: any): void {
    if (eventName || metadata) {
    }

    // return this.cereSdk?.sendEvent(eventName, {
    //   ...metadata,
    //   ...{
    //     // TODO: Consider moving to SDK.
    //     metadata: {
    //       userAgent,
    //     },
    //   },
    // });
  }

  identify() {}
}

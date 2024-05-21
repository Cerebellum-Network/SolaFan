import {ProviderInterface} from './provider-interface';

declare global {
  interface Window {
    dataLayer: any;
  }
}

export class GTMProvider implements ProviderInterface {
  constructor() {
    window.dataLayer = window.dataLayer || [];
  }

  init(): void {}

  track(eventName: string, metadata: any): void {
    window.dataLayer.push({
      event: eventName,
      ...metadata,
    });
  }

  identify() {}
}

type ReactNativeWebView = {
  postMessage: (params: string) => {};
};

type Platform = 'android' | 'ios';

export declare const window: Window & typeof globalThis & ReactNativeWebView;

declare global {
  interface Window {
    ReactNativeWebView: ReactNativeWebView;
    platform: Platform;
  }
}

export declare const document: Document & typeof globalThis & ReactNativeWebView;

declare global {
  interface Document {
    ReactNativeWebView: ReactNativeWebView;
    platform: Platform;
  }
}

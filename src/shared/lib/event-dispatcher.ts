// TODO: Should be moved to the separate SDK.
export type Event = {
  eventType: string;
  eventData: Record<string, unknown>;
};

export const sendEvent = (event: Event) => {
  // TODO: Check if environment is RN
  window.ReactNativeWebView?.postMessage(JSON.stringify(event));
  window.parent?.postMessage({templateEvent: event.eventType, templatePayload: event.eventData}, '*');
};

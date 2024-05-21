export type User = {
  email?: string;
};

export interface ProviderInterface {
  sessionId?: string;
  init(): void;
  identify(user: User, metadata?: Record<string, string | number>): unknown;
  track(eventName: string, metadata: any): void;
}

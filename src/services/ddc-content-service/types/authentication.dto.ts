export type AuthHeaderKeys = 'x-message' | 'x-signature' | 'x-public-key';

export interface GetAuthMessageRequest {
  walletPublicKey: string;
}

export type GetAuthMessageResponse = string;

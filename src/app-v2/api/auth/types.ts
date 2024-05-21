export type WalletParams = {
  type: string;
  token?: string;
  email?: string;
  password?: string;
  externalUserId?: string;
};

export type WalletData = {
  publicKey: string;
  privateKey: string;
  token?: string;
  locale: string;
};

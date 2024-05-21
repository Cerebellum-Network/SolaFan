export enum NonCustodyWalletTypeEnum {
  TORUS = 'TORUS',
  METAMASK = 'METAMASK',
  WALLET_CONNECT = 'WALLET_CONNECT',
}

export const NonCustodyWalletTitles: Record<NonCustodyWalletTypeEnum, string> = {
  [NonCustodyWalletTypeEnum.TORUS]: 'Cere',
  [NonCustodyWalletTypeEnum.METAMASK]: 'MetaMask',
  [NonCustodyWalletTypeEnum.WALLET_CONNECT]: 'WalletConnect',
};

export const isNonCustodyWalletType = (val: unknown): val is NonCustodyWalletTypeEnum => {
  return val === 'METAMASK' || val === 'WALLET_CONNECT' || val === 'TORUS';
};

export type NonCustodyWallet = {
  id: number;
  type: NonCustodyWalletTypeEnum;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
};

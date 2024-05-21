import {SupportedWalletType} from '../../models/wallet/types';

export type UserWalletRecord = {
  id: number;
  type: SupportedWalletType;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
};

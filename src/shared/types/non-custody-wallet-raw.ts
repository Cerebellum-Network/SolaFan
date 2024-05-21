import {isRecord} from './is-record';
import {NonCustodyWalletTypeEnum} from './non-custody-wallet';

export type NonCustodyWalletRaw = {
  id: number;
  type: NonCustodyWalletTypeEnum;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
};

export const isNonCustodyWalletRaw = (value: unknown): value is NonCustodyWalletRaw =>
  isRecord(value) &&
  value.id !== undefined &&
  value.type !== undefined &&
  value.publicKey !== undefined &&
  value.createdAt !== undefined &&
  value.updatedAt !== undefined;

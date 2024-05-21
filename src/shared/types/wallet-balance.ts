import {isRecord} from './is-record';

export type WalletBalance = {
  tokenUnits: number;
  usdCents: number;
};

export const isWalletBalanceRaw = (val: unknown): val is WalletBalance =>
  isRecord(val) && val.tokenUnits !== undefined && val.usdCents !== undefined;

import {WalletData} from './types';

export const isWalletData = (data: any): data is WalletData =>
  data &&
  data.publicKey &&
  typeof data.publicKey === 'string' &&
  data.privateKey &&
  typeof data.privateKey === 'string' &&
  data.locale &&
  typeof data.locale === 'string';

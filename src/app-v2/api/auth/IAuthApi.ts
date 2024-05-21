import {WalletData, WalletParams} from './types';

export interface IAuthApi {
  getIdToken(): Promise<string>;
  getWallet(params: WalletParams): Promise<WalletData>;
  fetchWallet({cereWallet, cereSignature}: {cereWallet: string; cereSignature: string}): Promise<WalletData>;
  getUserDataByToken(token: string): Promise<WalletData>;
  signInByEmail(email: string, locale?: string): Promise<void>;
  attachEmail(email: string): Promise<void>;
  sendOTPCodeByEmail(email: string): Promise<string>;
  sendOTPCodeBySocial(type: string, token: string): Promise<string>;
  confirmSocialEmail(type: string, token: string, password: string): Promise<string>;
  validateEmailOTP(email: string, otpCode: string): Promise<WalletData>;
}

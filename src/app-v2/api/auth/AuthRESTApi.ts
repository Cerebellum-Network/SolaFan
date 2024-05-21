import {AxiosInstance} from 'axios';

import {repeatableFetch} from '../../utils/lib/repeatable-fetch';
import {isRecord} from '../../utils/types/is-record';
import {IAuthApi} from './IAuthApi';
import {isWalletData} from './type-guards';
import {WalletData, WalletParams} from './types';
import {WrongAuthResponseFormatError} from './WrongAuthResponseFormatError';
import {WrongIdTokenFormatError} from './WrongIdTokenFormatError';

export class AuthRESTApi implements IAuthApi {
  constructor(private readonly client: AxiosInstance, private readonly appId: string) {}

  async getIdToken(): Promise<string> {
    const {data} = await this.client.get('/identity/id-token');
    if (!data || typeof data !== 'string') {
      throw new WrongIdTokenFormatError(data);
    }
    return data;
  }

  async attachEmail(email: string): Promise<void> {
    await this.client.post('/identity/attach-email', {email, appId: this.appId});
  }

  async confirmSocialEmail(type: string, token: string, password: string): Promise<string> {
    const {data} = await this.client.post('/identity/confirm-social-method', {type, token, password});
    if (!data.code || typeof data.code !== 'string') {
      throw new WrongAuthResponseFormatError();
    }
    return data.code;
  }

  async sendOTPCodeBySocial(type: string, token: string): Promise<string> {
    const {data} = await this.client.post('/identity/reset-social-code', {type, token});
    if (!data.code || typeof data.code !== 'string') {
      throw new WrongAuthResponseFormatError();
    }
    return data.code;
  }

  async sendOTPCodeByEmail(email: string): Promise<string> {
    const {data} = await this.client.post('/identity/reset-otp-code', {email, appId: this.appId});
    if (!data.code || typeof data.code !== 'string') {
      throw new WrongAuthResponseFormatError();
    }
    return data.code;
  }

  async getUserDataByToken(token: string): Promise<WalletData> {
    const {data: response} = await this.client.post(
      '/identity/me',
      {},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    if (!response || !isWalletData(response.data)) {
      throw new WrongAuthResponseFormatError();
    }
    return response.data;
  }

  async getWallet(params: WalletParams): Promise<WalletData> {
    const {data: response} = await this.client.post('/identity/fetch-wallet', {
      appId: this.appId,
      authMethod: params,
    });
    if (!response || !isWalletData(response.data)) {
      throw new WrongAuthResponseFormatError();
    }
    return response.data;
  }

  async fetchWallet({cereWallet, cereSignature}: {cereWallet: string; cereSignature: string}) {
    const url = new URL(this.client.getUri());
    url.pathname = '/identity/fetch-wallet';
    const response = await repeatableFetch(url.href, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        appId: this.appId,
        authMethod: {
          type: 'EMAIL_WALLET',
          cereWallet,
          cereSignature,
        },
      }),
      attempts: 10,
    }).then((r) => r.json());
    console.log({response});
    if (!isRecord(response) || !isWalletData(response.data)) {
      throw new WrongAuthResponseFormatError();
    }
    return response.data;
  }

  async signInByEmail(email: string, locale?: string): Promise<void> {
    await this.client.post('/identity/auth', {
      appId: this.appId,
      email,
      locale,
    });
  }

  validateEmailOTP(email: string, otpCode: string): Promise<WalletData> {
    return this.getWallet({type: 'EMAIL', email, password: otpCode});
  }
}

import {EmbedWallet, WalletEvent, WalletInitOptions} from '@cere/embed-wallet';
import {ethers} from 'ethers';

import {APP_ID, ENV, HTTP_PROVIDER_URL, NETWORK_ID, webAppUrl} from '../../../config/common';
import {UserDataStorage} from '../auth/UserDataStorage';
import {ConnectWalletOptions} from './types';

export type TorusWalletOptions = WalletInitOptions & {
  biconomyApiKey?: string;
  completeUrl?: string;
};

export class CereWallet {
  private wallet = new EmbedWallet();

  get status() {
    return this.wallet.status;
  }

  constructor(private readonly userDataStorage: UserDataStorage, private options: TorusWalletOptions) {}

  isReady(): Promise<unknown> {
    return this.wallet.isReady.then(() => null);
  }

  async init(options?: ConnectWalletOptions) {
    console.log('torus status', this.status);
    if (this.status !== 'not-ready') {
      return;
    }

    const defaultName = window.location.hostname;
    const defaultAppUrl = window.location.origin;

    const {context} = this.options;

    await this.wallet.init({
      ...this.options,
      context: {
        app: {
          url: context?.app?.url || defaultAppUrl,
          logoUrl: options?.appConfig.logoShort.url || context?.app?.logoUrl,
          name: options?.appConfig.appTitle || context?.app?.name || defaultName,
          appId: APP_ID(),
        },
        whiteLabel: {
          skipLoginIntro: true,
          mainColor: '#000000',
          connectScreenSettings: {
            connectScreenMainTitle: 'Davinci Wallet',
            hideIconInHeader: true,
            connectScreenMainText:
              'Sign-up to invest/sell and trade artist collectibles. Net proceeds will go directly to the artists.',
            poweredBySection: true,
          },
          verifyScreenSettings: {
            verifyScreenMainTitle: 'Verify your Email',
            hideIconInHeader: true,
            verifyScreenMainText: 'Access Davinci using the code sent to your email',
            poweredBySection: true,
          },
          permissionsScreenSettings: {
            hideIconInHeader: true,
            poweredBySection: true,
          },
        },
      },
      connectOptions: {
        permissions: {
          personal_sign: {}, // Automatically sign messages with the user's approve
        },
      },
    });
  }

  async cleanUp() {
    await this.disconnect();
  }

  getAddress() {
    return this.getProvider().getSigner().getAddress();
  }

  async getUserData() {
    return this.wallet.getUserInfo();
  }

  async getUserEmail() {
    const userInfo = await this.getUserData();
    return userInfo.email;
  }

  async isNewUser() {
    const userInfo = await this.getUserData();
    return userInfo.isNewUser;
  }

  async connect(options?: ConnectWalletOptions) {
    if (this.status === 'connected') {
      return this.getAddress();
    }

    await this.wallet.isReady;

    try {
      await this.wallet.connect({
        loginHint: options?.email,
      });
    } catch (e) {
      throw e;
    }

    const email = await this.getUserEmail();
    this.userDataStorage.setUserEmail(email);

    return this.getAddress();
  }

  async disconnect() {
    await this.wallet.disconnect();
  }

  subscribe(event: WalletEvent, handler: (...args: any[]) => void) {
    return this.wallet.subscribe(event, handler);
  }

  switchNetwork() {
    this.wallet.showWallet('settings');
  }

  topUp() {
    this.wallet.showWallet('topup');
  }

  async openWallet() {
    await this.wallet.showWallet();
  }

  getProvider() {
    return new ethers.providers.Web3Provider(this.wallet.provider);
  }
}

export const createTorusWallet = (userDataStorage: UserDataStorage, completeUrl?: string) => {
  if (!NETWORK_ID || !HTTP_PROVIDER_URL) {
    throw new Error('Tor.us: Incorrect configuration in .env');
  }

  return new CereWallet(userDataStorage, {
    env: ENV as TorusWalletOptions['env'],
    completeUrl: completeUrl ? `${webAppUrl()}${completeUrl}` : undefined,
    network: {
      host: HTTP_PROVIDER_URL,
      chainId: NETWORK_ID,
    },
  });
};

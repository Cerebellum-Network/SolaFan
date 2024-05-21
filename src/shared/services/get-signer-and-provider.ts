import {CreateProviderReturn, createProviderSigner} from '@cere/freeport-sdk';

import {BICONOMY_API_KEY, ENV, HTTP_PROVIDER_URL} from '../../config/common';
import {isNonCustodyWalletType} from '../types/non-custody-wallet';
import {Signer} from '../types/signer';
import {isAppWallet, SupportedWallet} from '../types/supported-wallet';
import {getSigner} from './non-custody-wallet';
import {fetchPrivateKey} from './private-key.service';

let davinciSignerProviderMap = new Map<string, CreateProviderReturn>();

export const getDavinciSignerAndProvider = async (userToken: string): Promise<CreateProviderReturn> => {
  if (davinciSignerProviderMap.has(userToken)) {
    return davinciSignerProviderMap.get(userToken)!;
  }

  const privateKey = await fetchPrivateKey(userToken);

  const providerSigner = await createProviderSigner({
    rpcUrl: HTTP_PROVIDER_URL,
    privateKey,
    biconomyApiKey: BICONOMY_API_KEY,
    biconomyDebug: ENV === 'dev',
  });

  davinciSignerProviderMap.set(userToken, providerSigner);

  return providerSigner;
};

export const getWalletSigner = async (walletType: SupportedWallet, userToken?: string): Promise<Signer> => {
  if (isAppWallet(walletType)) {
    if (!userToken) {
      throw Error("Can't load signer for anonymous user");
    }
    const {signer} = await getDavinciSignerAndProvider(userToken);
    return signer;
  }

  if (isNonCustodyWalletType(walletType)) {
    return getSigner(walletType);
  }

  throw Error(`Unsupported wallet type ${walletType}`);
};

export const resetSignerAndProvider = () => {
  davinciSignerProviderMap.clear();
};

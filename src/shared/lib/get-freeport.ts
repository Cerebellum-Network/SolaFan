import {createFreeport, Freeport, getFreeportAddress} from '@cere/freeport-sdk';

import {APPLICATION, CONTRACTS_DEPLOYMENT, HTTP_PROVIDER_URL} from '../../config/common';
import {getDavinciSignerAndProvider} from '../services/get-signer-and-provider';
import {getSigner} from '../services/non-custody-wallet';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {delay} from './delay';

const CONCURRENT_INITIALIZER_INTERVAL = 1000;

if (!HTTP_PROVIDER_URL) {
  throw new Error('Specify "REACT_APP_HTTP_PROVIDER_URL" ENV parameters!');
}

let freeportCustodyMap = new Map<string, Freeport>();

export const getFreeport = async (userToken: string): Promise<Freeport> => {
  if (freeportCustodyMap.has(userToken)) {
    return freeportCustodyMap.get(userToken)!;
  }

  let freeport: Freeport | null = null;

  try {
    const {provider, signer} = await getDavinciSignerAndProvider(userToken);
    const contractAddress = await getFreeportAddress(provider, CONTRACTS_DEPLOYMENT, APPLICATION());
    freeport = await createFreeport({signer, contractAddress});
  } catch (err) {
    console.error(err);
    throw err;
  }

  freeportCustodyMap.set(userToken, freeport);

  return freeport;
};

let freeportNonCustodyMap = new Map<NonCustodyWalletTypeEnum, Freeport>();

let isInitializationInProgress = false;

export const getFreeportNonCustody = async (type: NonCustodyWalletTypeEnum): Promise<Freeport> => {
  while (isInitializationInProgress) {
    await delay(CONCURRENT_INITIALIZER_INTERVAL);
  }
  if (freeportNonCustodyMap.has(type)) {
    return freeportNonCustodyMap.get(type)!;
  }

  isInitializationInProgress = true;

  let freeport: Freeport;

  const signer = await getSigner(type);
  const contractAddress = await getFreeportAddress(signer.provider, CONTRACTS_DEPLOYMENT, APPLICATION());

  freeport = createFreeport({signer, contractAddress});

  isInitializationInProgress = false;

  freeportNonCustodyMap.set(type, freeport);

  return freeport;
};

export const resetFreeportClients = () => {
  freeportNonCustodyMap.clear();
  freeportCustodyMap.clear();
};

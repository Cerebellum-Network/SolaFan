import {createMarketplace, Deployment, getMarketplaceAddress, Marketplace} from '@cere/freeport-sc-sdk';

import {APPLICATION, CONTRACTS_DEPLOYMENT, HTTP_PROVIDER_URL} from '../../config/common';
import {getDavinciSignerAndProvider} from '../services/get-signer-and-provider';
import {getSigner} from '../services/non-custody-wallet';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {delay} from './delay';

const CONCURRENT_INITIALIZER_INTERVAL = 1000;

if (!HTTP_PROVIDER_URL) {
  throw new Error('Specify "REACT_APP_HTTP_PROVIDER_URL" ENV parameters!');
}

let marketplaceCustodyMap = new Map<string, Marketplace>();

export const getMarketplace = async (userToken: string): Promise<Marketplace> => {
  if (marketplaceCustodyMap.has(userToken)) {
    return marketplaceCustodyMap.get(userToken)!;
  }

  let marketplace: Marketplace | null = null;

  try {
    const {provider, signer} = await getDavinciSignerAndProvider(userToken);
    const contractAddress = await getMarketplaceAddress(provider, CONTRACTS_DEPLOYMENT as Deployment, APPLICATION());
    marketplace = await createMarketplace({signer, contractAddress});
  } catch (err) {
    console.error(err);
    throw err;
  }

  marketplaceCustodyMap.set(userToken, marketplace);

  return marketplace;
};

let marketplaceNonCustodyMap = new Map<NonCustodyWalletTypeEnum, Marketplace>();

let isInitializationInProgress = false;

export const getMarketplaceNonCustody = async (type: NonCustodyWalletTypeEnum): Promise<Marketplace> => {
  while (isInitializationInProgress) {
    await delay(CONCURRENT_INITIALIZER_INTERVAL);
  }
  if (marketplaceNonCustodyMap.has(type)) {
    return marketplaceNonCustodyMap.get(type)!;
  }

  isInitializationInProgress = true;

  let marketplace: Marketplace;

  const signer = await getSigner(type);
  const contractAddress = await getMarketplaceAddress(
    signer.provider,
    CONTRACTS_DEPLOYMENT as Deployment,
    APPLICATION(),
  );

  marketplace = createMarketplace({signer, contractAddress});

  isInitializationInProgress = false;

  marketplaceNonCustodyMap.set(type, marketplace);

  return marketplace;
};

export const resetMarketplaceClients = () => {
  marketplaceNonCustodyMap.clear();
  marketplaceCustodyMap.clear();
};

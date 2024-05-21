import {Collection, createCollection} from '@cere/freeport-sdk';

import {HTTP_PROVIDER_URL} from '../../config/common';
import {getDavinciSignerAndProvider} from '../services/get-signer-and-provider';
import {getSigner} from '../services/non-custody-wallet';
import {NonCustodyWalletTypeEnum} from '../types/non-custody-wallet';
import {delay} from './delay';

const CONCURRENT_INITIALIZER_INTERVAL = 1000;

if (!HTTP_PROVIDER_URL) {
  throw new Error('Specify "REACT_APP_HTTP_PROVIDER_URL" ENV parameters!');
}

let collectionCustodyMap = new Map<string, Collection>();

const constructKey = (token: string, collectionAddress: string) => `${token}-${collectionAddress}`;

export const getCollection = async (userToken: string, collectionAddress: string): Promise<Collection> => {
  const key = constructKey(userToken, collectionAddress);
  if (collectionCustodyMap.has(key)) {
    return collectionCustodyMap.get(key)!;
  }

  let collection: Collection | null = null;

  try {
    const {signer} = await getDavinciSignerAndProvider(userToken);
    collection = await createCollection({signer, contractAddress: collectionAddress});
  } catch (err) {
    console.error(err);
    throw err;
  }

  collectionCustodyMap.set(key, collection);

  return collection;
};

let collectionNonCustodyMap = new Map<string, Collection>();

let isInitializationInProgress = false;

const constructKeyNonCustody = (type: NonCustodyWalletTypeEnum, collectionAddress: string) =>
  `${type}-${collectionAddress}`;

export const getCollectionNonCustody = async (
  type: NonCustodyWalletTypeEnum,
  collectionAddress: string,
): Promise<Collection> => {
  while (isInitializationInProgress) {
    await delay(CONCURRENT_INITIALIZER_INTERVAL);
  }
  const key = constructKeyNonCustody(type, collectionAddress);
  if (collectionNonCustodyMap.has(key)) {
    return collectionNonCustodyMap.get(key)!;
  }

  isInitializationInProgress = true;

  let collection: Collection;

  const signer = await getSigner(type);

  collection = createCollection({signer, contractAddress: collectionAddress});

  isInitializationInProgress = false;

  collectionNonCustodyMap.set(key, collection);

  return collection;
};

export const resetCollectionClients = () => {
  collectionNonCustodyMap.clear();
  collectionCustodyMap.clear();
};

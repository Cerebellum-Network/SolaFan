import {ExhibitCardInterface} from '@cere/services-types/dist/types';

import {IRESTClient} from '../api-clients/IRESTClient';
import {ExhibitsByCreatorFetchError} from './ExhibitsByCreatorFetchError';
import {ICreatorApi} from './ICreatorApi';
import {NftsByCreatorFetchError} from './NftsByCreatorFetchError';
import {Nft} from './types';

export const createCreatorApi = (restClient: IRESTClient): ICreatorApi => {
  const getExhibitsByCreatorId = async (creatorId: string, locale: string): Promise<ExhibitCardInterface[]> => {
    try {
      const response = await restClient.makeRequest<ExhibitCardInterface[]>(
        'get',
        `creators/${creatorId}/exhibits?locale=${locale}`,
        () => true,
      );
      return response || [];
    } catch (e) {
      console.error(e.message);
      throw new ExhibitsByCreatorFetchError();
    }
  };

  const getNftsByCreatorId = async (creatorId: string, locale: string): Promise<Nft[]> => {
    try {
      const response = await restClient.makeRequest<Nft[]>(
        'get',
        `creators/${creatorId}/nfts?locale=${locale}`,
        () => true,
      );
      return response || [];
    } catch (e) {
      console.error(e.message);
      throw new NftsByCreatorFetchError();
    }
  };

  return {
    getExhibitsByCreatorId,
    getNftsByCreatorId,
  };
};

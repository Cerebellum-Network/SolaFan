import {FullCreatorInterface} from '@cere/services-types';

import {isCreator} from '../../utils/type-guards/creator';
import {IRESTClient} from '../api-clients/IRESTClient';
import {CreatorsFetchError} from './CreatorsFetchError';
import {ICreatorsApi} from './ICreatorsApi';

export const createCreatorsApi = (restClient: IRESTClient): ICreatorsApi => {
  const getAllCreators = async (locale: string): Promise<FullCreatorInterface[]> => {
    try {
      const response = await restClient.makeRequest<FullCreatorInterface[]>(
        'get',
        `/creators?locale=${locale}`,
        isCreator,
      );
      return response ?? [];
    } catch (error) {
      console.error(error.message);
      throw new CreatorsFetchError();
    }
  };

  const getCreatorById = async (creatorId: string, locale: string) => {
    try {
      const response = await restClient.makeRequest<FullCreatorInterface>(
        'get',
        `/creators/${creatorId}?locale=${locale}`,
        isCreator,
      );
      return response;
    } catch (error) {
      console.error(error.message);
      throw new CreatorsFetchError();
    }
  };

  const getFeaturedCreators = async (locale: string): Promise<FullCreatorInterface[]> => {
    try {
      const response = await restClient.makeRequest<FullCreatorInterface[]>(
        'get',
        `/featured-creators?locale=${locale}`,
        isCreator,
      );
      return response ?? [];
    } catch (error) {
      console.error(error.message);
      throw new CreatorsFetchError();
    }
  };

  return {
    getAllCreators,
    getCreatorById,
    getFeaturedCreators,
  };
};

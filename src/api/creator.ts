import {FullCreatorInterface, NftCardInterface} from '@cere/services-types';
import {AxiosInstance} from 'axios';

export const createCreatorApi = (api: AxiosInstance) => {
  const getCreatorById = async (creatorId: string, locale: string): Promise<FullCreatorInterface | undefined> => {
    const {data: response} = await api.get(`/creators/${creatorId}?locale=${locale}`);
    return response.data;
  };

  const getAllCreators = async (locale: string): Promise<FullCreatorInterface[] | undefined> => {
    const {data: response} = await api.get(`/creators?locale=${locale}`);
    return response.data;
  };

  const getHomePageCreators = async (locale: string): Promise<FullCreatorInterface[] | undefined> => {
    const {data: response} = await api.get(`/featured-creators?locale=${locale}`);
    return response.data;
  };

  const getCreatorNft = async (
    creatorId: string,
    nftId: string,
    locale: string,
  ): Promise<NftCardInterface | undefined> => {
    const {data: response} = await api.get(`/creators/${creatorId}/nfts?filter=eq(id,${nftId})&locale=${locale}`);
    return response.data?.[0];
  };

  return {
    getCreatorById,
    getAllCreators,
    getHomePageCreators,
    getCreatorNft,
  };
};

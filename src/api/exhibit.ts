import {ExhibitionStatus, FullExhibitInterface} from '@cere/services-types';
import {AxiosInstance} from 'axios';

export const createExhibitApi = (api: AxiosInstance) => {
  const getHomePageExhibits = async (locale: string): Promise<unknown[] | undefined> => {
    const {data: response} = await api.get(`/featured-exhibits?locale=${locale}`);
    return response.data;
  };

  const getExhibitBySlug = async (slug: string, locale: string): Promise<FullExhibitInterface> => {
    const {data: response} = await api.get(`/exhibits/${slug}?locale=${locale}`);
    return response.data;
  };

  const getAllExhibits = async (locale: string, timelineStatus?: ExhibitionStatus): Promise<unknown[] | undefined> => {
    const query = `?locale=${locale}${timelineStatus ? `&timelineStatus=${timelineStatus}` : ''}`;
    const {data: response} = await api.get(`/exhibits/${query}`);
    return response.data;
  };

  const getRandomExhibits = async (locale: string): Promise<unknown[] | undefined> => {
    const {data: response} = await api.get(`/random-exhibits/?locale=${locale}`);
    return response.data;
  };

  return {
    getExhibitBySlug,
    getHomePageExhibits,
    getAllExhibits,
    getRandomExhibits,
  };
};

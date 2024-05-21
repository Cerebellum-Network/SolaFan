import {ExhibitionStatus} from '@cere/services-types';

import {CmsExhibit} from '../../types/exhibit';
import {CmsHome} from '../../utils/type-guards/exhibits';
import {isExhibit} from '../../utils/type-guards/exhibits';
import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {IRESTClient} from '../api-clients/IRESTClient';
import {EXHIBITS} from './exhibits.query';
import {ExhibitsFetchError} from './ExhibitsFetchError';
import {ExhibitsSeoFetchError} from './ExhibitsSeoFetchError';
import {IExhibitsApi} from './IExhibitsApi';
import {CmsSeo} from './types';

const mapGQLResponse = (cmsResponse: CmsHome): CmsSeo => ({
  seoCanonical: cmsResponse.seoCanonical,
  seoDescription: cmsResponse.seoDescription,
  seoImage: cmsResponse.seoImage,
  seoTitle: cmsResponse.seoTitle,
});

export const createExhibitsApi = (restClient: IRESTClient, apolloClient: IGraphQLClient): IExhibitsApi => {
  const getAllExhibits = async (locale: string, filter?: ExhibitionStatus): Promise<CmsExhibit[]> => {
    try {
      const search = new URLSearchParams();
      search.set('locale', locale);
      if (filter) {
        search.set('timelineStatus', filter);
      }
      const response = await restClient.makeRequest<CmsExhibit[]>('get', `exhibits/?${search.toString()}`, isExhibit);
      return response ?? [];
    } catch (error) {
      console.error(error.message);
      throw new ExhibitsFetchError();
    }
  };

  const getExhibitsSeo = async (limit: number, locale: string): Promise<CmsSeo[] | undefined> => {
    try {
      const response = await apolloClient.makeQuery<CmsHome[]>(EXHIBITS, {limit, locale}, 'exhibits', () => true);
      return (response ?? []).map(mapGQLResponse);
    } catch (error) {
      console.error(error);
      throw new ExhibitsSeoFetchError();
    }
  };

  return {
    getAllExhibits,
    getExhibitsSeo,
  };
};

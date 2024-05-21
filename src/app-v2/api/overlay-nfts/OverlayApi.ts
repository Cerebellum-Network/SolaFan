import {NftCardInterface} from '@cere/services-types';

import {IRESTClient} from '../api-clients/IRESTClient';
import {IOverlayApi} from './IOverlayApi';

export const createOverlayApi = (restClient: IRESTClient): IOverlayApi => {
  const getNfts = async (slug: string, locale: string): Promise<NftCardInterface[] | unknown> => {
    try {
      return await restClient.makeRequest('get', `/exhibits/${slug}/nfts?locale=${locale}`, () => true);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getNfts,
  };
};

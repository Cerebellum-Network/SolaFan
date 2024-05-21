import {NftCardInterface} from '@cere/services-types';

import {EventBanner, NFTBanner} from './types';

export interface IHomePageNftsApi {
  getFeaturedNfts(locale: string): Promise<NftCardInterface[]>;
  getPageNfts(requestParams: {
    minPrice?: number;
    maxPrice?: number;
    creatorId?: string;
    date?: number;
    sorting?: {
      fieldName: string;
      order: 'ASC' | 'DESC';
    };
    locale?: string;
  }): Promise<NftCardInterface[]>;
  getBannerItems(): Promise<Array<NFTBanner | EventBanner>>;
}

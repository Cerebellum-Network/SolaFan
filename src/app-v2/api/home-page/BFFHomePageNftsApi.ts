import {NftCardInterface} from '@cere/services-types';
import dayjs from 'dayjs';

import {isNftCardInterface} from '../../utils/type-guards/nfts';
import {IRESTClient} from '../api-clients/IRESTClient';
import {IHomePageNftsApi} from './IHomePageNftsApi';
import {isBannerItem} from './type-guards';
import {EventBanner, NFTBanner} from './types';

export class BFFHomePageNftsApi implements IHomePageNftsApi {
  constructor(private readonly client: IRESTClient) {}

  async getFeaturedNfts(locale: string): Promise<NftCardInterface[]> {
    const nfts = await this.client.makeRequest<NftCardInterface[]>(
      'get',
      `/featured-nfts?locale=${locale}`,
      isNftCardInterface,
    );
    return nfts ?? [];
  }

  async getPageNfts({
    locale,
    minPrice,
    maxPrice,
    creatorId,
    date,
    sorting,
  }: {
    minPrice?: number;
    maxPrice?: number;
    creatorId?: string;
    date?: number;
    sorting?: {fieldName: string; order: 'ASC' | 'DESC'};
    locale?: string;
  }): Promise<NftCardInterface[]> {
    let url = `/home-nfts?locale=${locale}`;
    const search: string[] = [];
    const query: string[] = [];
    if (minPrice) {
      search.push(`ge(priceUsd,${minPrice})`);
    }
    if (maxPrice) {
      search.push(`le(priceUsd,${maxPrice})`);
    }
    if (creatorId) {
      search.push(`eq(creatorId,${creatorId})`);
    }
    if (date) {
      const day = dayjs(date).set('hours', 0).set('minutes', 0).unix() * 1000;
      const nextDay = dayjs(day).add(1, 'day').unix() * 1000;
      search.push(`and(ge(createdAt,${day}),lt(createdAt,${nextDay}))`);
    }
    if (search.length) {
      query.push(`filter=and(${search.join(',')})`);
    }
    if (sorting) {
      const sortingOrder = sorting.order.toLowerCase() === 'asc' ? '+' : '-';
      query.push(`sort=${sortingOrder}${sorting.fieldName}`);
    }
    if (query.length) {
      url = url + `&${query.join('&')}`;
    }
    const nfts = await this.client.makeRequest<NftCardInterface[]>('get', url, isNftCardInterface);
    return nfts ?? [];
  }

  async getBannerItems(): Promise<Array<NFTBanner | EventBanner>> {
    const bannerItems = await this.client.makeRequest<Array<NFTBanner | EventBanner>>('get', '/banners', isBannerItem);
    return bannerItems ?? [];
  }
}

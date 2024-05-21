import {NftCardInterface} from '@cere/services-types';
import dayjs from 'dayjs';

import {UsersNftCardInterface} from '../../types/nft';
import {isNftCardInterface} from '../../utils/type-guards/nfts';
import {IRESTClient} from '../api-clients/IRESTClient';
import {NftNotFoundError} from './NftNotFoundError';

type HomePageNftsRequestParams = {
  minPrice?: number;
  maxPrice?: number;
  creatorId?: string;
  date?: number;
  sorting?: {
    fieldName: string;
    order: 'ASC' | 'DESC';
  };
  locale?: string;
  ids?: string[];
  walletAddress?: string;
};

export const createNftsApi = (restClient: IRESTClient) => {
  return {
    async getNftById(id: string, locale: string, walletAddress?: string): Promise<NftCardInterface> {
      let queryParams = `/nfts/${id}?locale=${locale}`;
      if (walletAddress) {
        queryParams += `&walletAddress=${walletAddress}`;
      }
      const nft = await restClient.makeRequest<UsersNftCardInterface>('get', queryParams, isNftCardInterface);
      if (!nft) {
        throw new NftNotFoundError('id', id);
      }
      return nft;
    },

    async getAllNfts({
      minPrice,
      maxPrice,
      creatorId,
      date,
      sorting,
      locale,
      ids = [],
      walletAddress,
    }: HomePageNftsRequestParams = {}) {
      let url = `/nfts?locale=${locale}`;
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
      if (ids?.length > 0) {
        query.push(`ids=${ids?.join(',')}`);
      }
      if (walletAddress) {
        query.push(`&walletAddress=${walletAddress}`);
      }
      if (query.length) {
        url = url + `&${query.join('&')}`;
      }

      const empty: NftCardInterface[] = [];
      const nfts = await restClient.makeRequest<NftCardInterface[]>('get', url, isNftCardInterface);
      return nfts ?? empty;
    },

    async getFeaturedNfts(locale: string): Promise<NftCardInterface[]> {
      const nfts = await restClient.makeRequest<NftCardInterface[]>(
        'get',
        `/featured-nfts?locale=${locale}`,
        isNftCardInterface,
      );
      return nfts ?? [];
    },

    async getSecondaryNfts({
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
      let url = `/secondary-nfts?locale=${locale}`;
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
      const nfts = await restClient.makeRequest<NftCardInterface[]>('get', url, isNftCardInterface);
      return nfts ?? [];
    },
    async getSecondaryFeaturedNfts(locale: string) {
      const nfts = await restClient.makeRequest<NftCardInterface[]>(
        'get',
        `/secondary-featured-nfts?locale=${locale}`,
        isNftCardInterface,
      );
      return nfts ?? [];
    },
  };
};

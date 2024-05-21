import {NftCardInterface} from '@cere/services-types';
import {AxiosInstance} from 'axios';
import dayjs from 'dayjs';

export type HomePageNftsRequestParams = {
  minPrice?: number;
  maxPrice?: number;
  creatorId?: string;
  date?: number;
  sorting?: {
    fieldName: string;
    order: 'ASC' | 'DESC';
  };
  locale?: string;
};

export const createNftApi = (api: AxiosInstance) => {
  const getNftById = async (nftId: string, locale: string): Promise<NftCardInterface | null> => {
    const {data: response} = await api.get(`/nfts/${nftId}?locale=${locale}`);
    const nft = response.data;
    return nft ?? null;
  };

  const getNftsByAddressList = async (addressList: string[]): Promise<NftCardInterface[]> => {
    const {data: response} = await api.get(`/nfts?filter=in(address,${addressList.join(',')})`);
    return response?.data || [];
  };

  const getNftByAddress = async (address: string, locale: string): Promise<NftCardInterface | null> => {
    const {data: response} = await api.get(`/nfts?filter=eq(address,${address})&locale=${locale}`);
    const nft = response.data?.[0];
    return nft ?? null;
  };

  const getFeaturedNfts = async (locale: string): Promise<NftCardInterface[] | null> => {
    const {data: response} = await api.get(`/featured-nfts?locale=${locale}`);
    const featuredNfts = response.data;
    return featuredNfts ?? null;
  };

  const getAllNfts = async ({
    minPrice,
    maxPrice,
    creatorId,
    date,
    sorting,
    locale,
  }: HomePageNftsRequestParams = {}): Promise<NftCardInterface[]> => {
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
    if (query.length) {
      url = url + `&${query.join('&')}`;
    }
    const {data: response} = await api.get(url);
    return response.data;
  };

  const getHomePageNfts = async ({
    minPrice,
    maxPrice,
    creatorId,
    date,
    sorting,
    locale,
  }: HomePageNftsRequestParams = {}): Promise<NftCardInterface[]> => {
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
    const {data: response} = await api.get(url);
    return response.data;
  };

  const getMarketplacePageNfts = async ({
    minPrice,
    maxPrice,
    creatorId,
    date,
    sorting,
    locale,
  }: HomePageNftsRequestParams = {}): Promise<NftCardInterface[]> => {
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
    const {data: response} = await api.get(url);
    return response.data;
  };

  const getCreatorPageNftsByCreatorId = async (creatorId: string, locale: string): Promise<NftCardInterface[]> => {
    const {data: response} = await api.get(`/creators/${creatorId}/nfts?locale=${locale}`);
    return response.data;
  };

  const getExhibitNftsBySlug = async (slug: string, locale: string): Promise<NftCardInterface[]> => {
    const {data: response} = await api.get(`/exhibits/${slug}/nfts?locale=${locale}`);
    return response.data;
  };

  const getNftsByIdsList = async (ids: string[], locale: string): Promise<NftCardInterface[]> => {
    const {data: response} = await api.get(`/nfts?locale=${locale}&filter=in(id,${ids.join(',')})`);
    return response.data;
  };

  return {
    getNftById,
    getNftByAddress,
    getFeaturedNfts,
    getAllNfts,
    getHomePageNfts,
    getMarketplacePageNfts,
    getNftsByAddressList,
    getCreatorPageNftsByCreatorId,
    getExhibitNftsBySlug,
    getNftsByIdsList,
  };
};

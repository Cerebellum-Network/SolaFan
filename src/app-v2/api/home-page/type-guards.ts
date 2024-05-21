import {BannerItem, BannerTypes} from './types';

export const isBannerItem = (data: any): data is BannerItem => {
  switch (data?.type) {
    case BannerTypes.NFT:
      return (
        data.id &&
        typeof data.id === 'string' &&
        data.title &&
        typeof data.title === 'string' &&
        data.description &&
        typeof data.description === 'string' &&
        data.creatorName &&
        typeof data.creatorName === 'string' &&
        data.creatorId &&
        typeof data.creatorId === 'string' &&
        data.priceUsd &&
        typeof data.priceUsd === 'number'
      );
    case BannerTypes.Exhibit:
      return (
        data.id &&
        typeof data.id === 'string' &&
        data.title &&
        typeof data.title === 'string' &&
        data.description &&
        typeof data.description === 'string' &&
        data.image &&
        typeof data.image.url === 'string' &&
        data.slug &&
        typeof data.slug === 'string'
      );
    default:
      return false;
  }
};

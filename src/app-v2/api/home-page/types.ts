export enum BannerTypes {
  Exhibit,
  NFT,
}

export type NFTBanner = {
  id: string;
  type: BannerTypes.NFT;
  title: string;
  description: string;
  image: string;
  creatorName: string;
  creatorLogo: string;
  priceUSD: number;
};

export type EventBanner = {
  id: string;
  type: BannerTypes.Exhibit;
  title: string;
  description: string;
  image: {url: string};
  startsAt: string;
  endsAt: string;
  slug: string;
};

export type BannerItem = NFTBanner | EventBanner;

import {AvailabilityStatus, NftCardInterface, NftType} from '@cere/services-types';

const filterNftsByAvailability = (nfts: NftCardInterface[], availability: AvailabilityStatus) =>
  nfts.filter((nft) => nft.availability === availability);

export const sortNftsByAvailability = (nfts: NftCardInterface[]) => [
  ...filterNftsByAvailability(nfts, AvailabilityStatus.ONGOING),
  ...filterNftsByAvailability(nfts, AvailabilityStatus.COMING_SOON),
  ...filterNftsByAvailability(nfts, AvailabilityStatus.SOLD_OUT),
  ...filterNftsByAvailability(nfts, AvailabilityStatus.OFFER_ENDED),
];

export const sortNftsByNftType = (nfts: NftCardInterface[]) =>
  nfts.sort((prev, next) => {
    if (prev.nftType === next.nftType) {
      return 0;
    }
    return next.nftType === NftType.AUCTIONED ? 1 : -1;
  });

export const sortNftsByPurchaseStatus = (a: NftCardInterface, b: NftCardInterface) => {
  // Приведение к числовому значению для сравнения
  const statusA = a.purchaseStatus === 'USER_HAS_NFT' ? 0 : 1;
  const statusB = b.purchaseStatus === 'USER_HAS_NFT' ? 0 : 1;

  // Сравнение
  if (statusA < statusB) {
    return -1;
  }
  if (statusA > statusB) {
    return 1;
  }
  return 0;
};

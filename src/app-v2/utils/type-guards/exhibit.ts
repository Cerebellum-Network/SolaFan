import {ExhibitCardInterface, NftCardInterface} from '@cere/services-types/dist/types';

export const isExhibit = (data: unknown): data is ExhibitCardInterface => {
  const exhibit = data as ExhibitCardInterface;
  return Boolean(
    exhibit.id &&
      exhibit.title &&
      exhibit.slug &&
      exhibit.subtitle &&
      exhibit.description &&
      exhibit.image &&
      exhibit.creator,
  );
};

export const isNft = (data: unknown): data is NftCardInterface => {
  const nft = data as NftCardInterface;
  return Boolean(
    nft.id &&
      nft.orderId &&
      nft.title &&
      nft.nftType &&
      nft.price &&
      nft.title &&
      nft.image &&
      nft.auctionStatus &&
      nft.supply &&
      nft.balance &&
      nft.priceUsd,
  );
};

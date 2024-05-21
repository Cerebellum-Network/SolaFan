import {AuctionStatus, AvailabilityStatus, NftCardInterface, NftType} from '@cere/services-types';

import {UsersNftCardInterface} from '../../types/nft';

export function nftWillBeAvailableLater({
  availability,
  auctionStatus,
  nftType,
}: Pick<UsersNftCardInterface, 'availability' | 'nftType' | 'auctionStatus'>) {
  return (
    availability === AvailabilityStatus.COMING_SOON ||
    (auctionStatus === AuctionStatus.NOT_STARTED && nftType !== NftType.ACCESS)
  );
}

export function nftSoldOut({
  availability,
  auction,
  auctionStatus,
  balance,
}: Pick<NftCardInterface, 'availability' | 'auction' | 'auctionStatus' | 'balance'>) {
  return (
    availability === AvailabilityStatus.SOLD_OUT ||
    !balance ||
    nftAuctionSoldOut({availability, auction, auctionStatus})
  );
}

export function nftAuctionSoldOut({
  availability,
  auction,
  auctionStatus,
}: Pick<NftCardInterface, 'availability' | 'auction' | 'auctionStatus'>) {
  return (
    auction &&
    auction?.bids?.length > 0 &&
    auctionStatus === AuctionStatus.ACTIVE &&
    availability === AvailabilityStatus.OFFER_ENDED
  );
}

export function byNftAvailability(nftA: NftCardInterface, nftB: NftCardInterface) {
  // first - available, second - coming soon, third - sold out
  if (nftSoldOut(nftA)) {
    return 1;
  }
  if (nftSoldOut(nftB)) {
    return -1;
  }
  if (nftWillBeAvailableLater(nftA)) {
    return 1;
  }
  if (nftWillBeAvailableLater(nftB)) {
    return -1;
  }
  return 0;
}

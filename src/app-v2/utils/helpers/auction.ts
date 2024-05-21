import {BidInterface, WalletInterface} from '@cere/services-types';
import abbreviate from '@pqt/abbreviate';

import {BID_STATUSES, BidInterfaceWithStatus} from '../../types/auction';
import {getStorageItem} from './localStorage';

const BIDS_KEY = 'BIDS';

export const comparePublicKeys = (keyA: string, keyB: string): boolean => keyA.toLowerCase() === keyB.toLowerCase();

export const getIsUserBid = (
  bid: Pick<BidInterface, 'buyer'>,
  userWalletAddress: string,
  externalWallets: WalletInterface[],
) => {
  return (
    comparePublicKeys(userWalletAddress || '', bid.buyer) ||
    !!externalWallets.find((wallet) => comparePublicKeys(wallet.publicKey, bid.buyer))
  );
};

export const sortBids = (bids: BidInterfaceWithStatus[]) => {
  const tempBidsHistory = [...bids];
  return tempBidsHistory.sort((prev, next) => next.price - prev.price);
};

export const getBidHistoryStatus = (nftId?: string, bids?: BidInterface[]): BidInterfaceWithStatus[] => {
  if (!nftId || !bids) {
    return [];
  }
  // TODO - change logic from localStorago to redax if it is necessary
  const processingNfts: Record<string, Record<string, BidInterfaceWithStatus>> = getStorageItem(BIDS_KEY);
  const processingBids = processingNfts![nftId ?? ''] || {};

  return sortBids([
    ...Object.values(processingBids).map((bid) => ({...bid, bidStatus: BID_STATUSES.PENDING})),
    ...(bids ? bids.map((bid) => ({...bid, bidStatus: BID_STATUSES.COMPLETED})) : []),
  ]);
};

export const checkIsHighestBid = (
  userPublicKey: string,
  externalWallets: WalletInterface[],
  nftAuctionBuyer?: string,
) =>
  [userPublicKey, ...externalWallets.map((w) => w.publicKey)]
    .map((key) => key.toLowerCase())
    .includes(nftAuctionBuyer ?? '');

export const getBidTokensValue = (amount: number) => {
  if (amount < 1_000_000) {
    return amount;
  }

  return abbreviate(amount, 1).replace('.', ',');
};

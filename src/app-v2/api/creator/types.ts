import {Auction} from '@cere/freeport-sdk';
import {
  AuctionStatus,
  AvailabilityStatus,
  ExhibitionStatus,
  NftPriceType,
  NftSellingType,
  NftType,
  UploadFile,
} from '@cere/services-types/dist/types';
import {Localization} from '@material-ui/core/locale';

export type ExhibitCard = {
  id: string;
  startsAt?: string;
  endsAt?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  allowFreeAccess?: boolean;
  ticketModalTitle?: string;
  ticketModalBody?: string;
  nftVisualExhibit?: boolean;
  image: UploadFile;
  creator: {
    id: string;
    name?: string;
    avatar: {
      url: string;
      alternativeText: string;
    };
  };
  exhibitionStatus?: ExhibitionStatus;
};

export type Nft = {
  id: string;
  address: string;
  isComingSoon?: boolean;
  exhibitionId?: string;
  exhibitionSlug?: string;
  exhibitionStatus?: ExhibitionStatus;
  isExhibitionAllowFreeAccess?: boolean;
  availableFrom?: string;
  creatorId: string;
  creatorName: string;
  minter: string;
  collectionAddress?: string;
  availableTo?: string;
  createdAt?: string;
  updatedAt?: string;
  auction?: Auction;
  auctionStatus: AuctionStatus;
  nftType: NftType;
  image?: string;
  title: string;
  description: string;
  price: number;
  priceUsd: number;
  priceType: NftPriceType;
  balance?: number;
  sellingType?: NftSellingType;
  sellerWalletAddress?: string;
  supply?: number;
  availability?: AvailabilityStatus;
  locale: string;
  localizations: Localization[];
  orderId?: string;
  purchaseStatus: 'USER_HAS_NFT' | 'USER_DOES_NOT_HAVE_NFT' | 'USER_PAYMENT_PROCESSING';
  unlockingEvents?: string[];
  unlockingEventsSlugs: string[];
};

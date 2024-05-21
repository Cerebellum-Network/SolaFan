import {NftCardInterface} from '@cere/services-types';

import {AppConfig} from '../shared/types/app-config';
import {Optional} from '../shared/types/optional';

export type AppContextType = {
  appConfig: AppConfig;
  appInstanceId: string;
};

export type NFTPurchaseData = {
  amount: number;
} & Optional<NftCardInterface, 'createdAt' | 'updatedAt'>;

export type NFTPurchaseError = {
  nftId: string;
  message: string;
};

export interface PurchaseNFTContextType {
  isPurchaseInProgress: boolean;
  purchase: NFTPurchaseData | null;
  startNFTPurchase: (nftData: NFTPurchaseData, isContinue?: boolean, price?: string) => Promise<void>;
  setPurchaseData: (nftData: NFTPurchaseData | null) => void;
}

export enum PurchaseNFTModalTypes {
  PURCHASE_MODAL = 'PURCHASE_MODAL',
  LIMITED_TICKET_PURCHASE_MODAL = 'LIMITED_TICKET_PURCHASE_MODAL',
  LIMITED_TICKET_PURCHASE_MODAL_CONTINUE = 'LIMITED_TICKET_PURCHASE_MODAL_CONTINUE',
  AUCTION_PURCHASE_MODAL = 'AUCTION_PURCHASE_MODAL',
  PURCHASE_CONFIRMED_MODAL = 'PURCHASE_CONFIRMED_MODAL',
  PURCHASE_FAIL_MODAL = 'PURCHASE_FAIL_MODAL',
}

export enum PurchaseCallbackTypes {
  BUY_LIMITED_NFT = 'buyLimitedNft',
  BUY_NFT_BY_CARD = 'buyNftByCard',
  BUY_NFT = 'buyNft',
}

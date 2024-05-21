import {isRecord} from '../is-record';
import {Numberish} from '../numberish';
import {CmsNft} from './cms-nft';
import {CreatorAuction} from './creator-auction';

export interface CreatorWalletNft {
  wallet: string;
  quantity: number;
  nft_id: {
    nft_id: string;
    cmsNft: CmsNft;
  };
}

export type CreatorNft = {
  id: Numberish;
  minter: {wallet: string};
  collection_address: string;
  nftId: string;
  supply: number;
  freeport_collection?: {address: string};
  orders: Array<{
    // FIXME: should be updated based on CMS model
    amount: number;
    price: number;
    buyer: string;
    balance: number;
    royaltyFee: string;
    creator: {wallet: string};
    orderId?: string;
  }>;
  creator_wallet_nfts: CreatorWalletNft[];
  creator_make_offer: Array<{price: number; seller: string; published_at: string}>;
  auctions: [CreatorAuction];
};

export type CreatorNftWithWallets = CreatorNft & {
  creator_wallet_nfts: CreatorWalletNft[];
};

export type CreatorNftWithAuctions = {
  id: string;
  is_settled: boolean;
  creator_auctions: CreatorAuction[];
};

export const isCreatorNftWithBalance = (value: unknown): value is CreatorNftWithBalance =>
  isRecord(value) &&
  value.nftId !== undefined &&
  typeof value.nftId === 'string' &&
  value.minter !== undefined &&
  typeof value.minter === 'string' &&
  value.supply !== undefined &&
  typeof value.supply === 'number' &&
  value.quantity !== undefined &&
  typeof value.quantity === 'number';

export type CreatorNftWithBalance = {
  nftId: string;
  minter: string; // not exists. ticket: https://www.notion.so/cere/Freeport-API-Add-the-required-parameters-to-the-owned-API-16025e2afb724afe8b1c4e234cebf583?pvs=4
  supply: number;
  quantity: number; // not exists. ticket: https://www.notion.so/cere/Freeport-API-Add-the-required-parameters-to-the-owned-API-16025e2afb724afe8b1c4e234cebf583?pvs=4
  collection?: {address: string};
  balance?: number; // not exists. ticket: https://www.notion.so/cere/Freeport-API-Add-the-required-parameters-to-the-owned-API-16025e2afb724afe8b1c4e234cebf583?pvs=4
};

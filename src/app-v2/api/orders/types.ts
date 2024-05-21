import {UploadFileFormats} from '@cere/services-types';

export type NftOrder = {
  id: string;
  creator: {
    name: string;
    avatar?: {
      url: string;
      formats?: UploadFileFormats;
    };
  };
  price: string;
  quantity: number;
  timestamp: string;
};

export type OrdersQueryResponse = {
  cmsV2Nft: {
    freeportNft: {
      freeport_collection: {address: string};
      minter: {wallet: string};
      orders: {
        orderId: string;
        amount: number;
        balance: number;
        price: string;
        royaltyFee: string;
        created_at: string;
        creator: {wallet: string};
      }[];
      cmsNfts: {
        cmsCreator: {
          id: string;
          name: string;
          avatar: {
            url: string;
            formats: UploadFileFormats;
          };
        };
      }[];
    };
  };
};

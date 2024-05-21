import {OrdersQueryResponse} from './types';

export const isOrdersQueryResponse = (data: any): data is OrdersQueryResponse =>
  typeof data?.freeportNft?.freeport_collection?.address === 'string' &&
  typeof data?.freeportNft?.minter?.wallet === 'string' &&
  data?.freeportNft?.orders?.every(
    (order: any) =>
      typeof order?.orderId === 'number' &&
      typeof order?.amount === 'number' &&
      typeof order?.balance === 'number' &&
      typeof order?.price === 'string' &&
      typeof order?.royaltyFee === 'string' &&
      typeof order?.created_at === 'string' &&
      typeof order?.creator?.wallet === 'string',
  );

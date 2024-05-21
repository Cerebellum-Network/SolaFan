import {Order} from '../../types/order';
import {IRESTClient} from '../api-clients/IRESTClient';
import {OrdersNotFoundError} from './OrdersNotFoundError';

export const createOrdersApi = (restClient: IRESTClient) => {
  const loadNftOrders = async (
    collectionAddress: string,
    nftId: string,
    walletPublicKey?: string,
  ): Promise<Order[] | undefined> => {
    const orders = await restClient.makeRequest<Order[]>(
      'get',
      `/nfts/${collectionAddress}/${nftId}/orders`,
      () => true,
      {
        headers: {
          walletPublicKey: walletPublicKey,
        },
      },
    );
    if (!orders) {
      throw new OrdersNotFoundError();
    }
    return orders;
  };
  return {
    loadNftOrders,
  };
};

import {Order} from '../../types/order';

export interface IOrdersApi {
  loadNftOrders(collectionsAddress: string, nftId: string, walletPublicKey?: string): Promise<Order[] | undefined>;
}

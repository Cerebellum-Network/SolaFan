import {PaymentMode} from './types';

export interface IPaymentApi {
  getFiatPaymentUrl(
    nftId: string,
    orderId: string,
    collectionAddress: string,
    quantity: number,
    eventId: number,
    locale: string,
    paymentType: PaymentMode,
    nftIdIncremental: string,
    buyerEmail?: string,
    buyerEthAddress?: string,
  ): Promise<string>;

  getUserEmailBySessionId(sessionId: string): Promise<string>;
}

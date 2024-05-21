import {FiatCurrencyEnum, FiatProviderEnum} from '@cere/services-types';
import {AxiosInstance} from 'axios';

import {getPopupPaymentUrl} from './helpers';
import {IPaymentApi} from './IPaymentApi';
import {PaymentUrlFetchError} from './PaymentUrlFetchError';
import {PaymentMode} from './types';

export class PaymentRESTApi implements IPaymentApi {
  constructor(private readonly client: AxiosInstance) {}

  async getFiatPaymentUrl(
    nftId: string,
    orderId: string,
    collectionAddress: string,
    quantity: number,
    eventId: number,
    locale: string,
    paymentMode: PaymentMode,
    nftIdIncremental: string,
    buyerEmail?: string,
    buyerEthAddress?: string,
  ): Promise<string> {
    const {successUrl, cancelUrl} = getPopupPaymentUrl(
      locale,
      paymentMode,
      nftIdIncremental,
      orderId,
      quantity.toString(),
      buyerEmail,
    );

    const params: {
      nftId: string;
      collectionId: string;
      orderId: number;
      quantity?: number;
      buyerEmail?: string;
      buyerEthAddress?: string;
      eventId: number;
      currency: FiatCurrencyEnum;
      successUrl: string;
      cancelUrl: string;
      locale: string;
      fiatProvider?: FiatProviderEnum;
    } = {
      nftId,
      quantity,
      eventId: Number(eventId),
      successUrl,
      cancelUrl,
      currency: FiatCurrencyEnum.USD,
      locale,
      collectionId: collectionAddress,
      orderId: Number(orderId),
      buyerEthAddress: buyerEthAddress || undefined,
      fiatProvider: FiatProviderEnum.STRIPE,
    };
    if (buyerEmail) {
      params.buyerEmail = buyerEmail;
    }
    const {data} = await this.client.post('/buy-nft-for-fiat', params);
    if (!data?.paymentUrl || typeof data.paymentUrl !== 'string') {
      throw new PaymentUrlFetchError();
    }
    return data.paymentUrl;
  }

  async getUserEmailBySessionId(sessionId: string): Promise<string> {
    const {data} = await this.client.get(
      `/payment-history/get-user-email-by-session-id?sessionId=${sessionId}&fiatProvider=${FiatProviderEnum.STRIPE}`,
    );
    return data.email;
  }
}

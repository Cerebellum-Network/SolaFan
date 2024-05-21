import {PaymentStatusEnum} from '@cere/services-types';

import {isRecord} from './is-record';

//  FIXME needs to change 'url' keyName when BE ready. Remove 'optional'
export type PaymentMetaData = {
  sessionId: string;
  paymentUrl: string;
};

export type PaymentHistoryItemRaw = {
  id: string;
  buyerEthAddress: string;
  sellerEthAddress: string;
  metadata: Record<string, string | Uint8Array> & PaymentMetaData;
  status: PaymentStatusEnum;
  updatedAt: string;
};

export const isPaymentHistoryItemRaw = (value: unknown): value is PaymentHistoryItemRaw =>
  isRecord(value) &&
  value.id !== undefined &&
  value.buyerEthAddress !== undefined &&
  value.sellerEthAddress !== undefined &&
  isRecord(value.metadata) &&
  value.status !== undefined;

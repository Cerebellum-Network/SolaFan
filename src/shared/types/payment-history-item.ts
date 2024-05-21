import {PaymentStatusEnum} from '@cere/services-types';

export type PaymentHistoryItem = {
  id: string;
  updatedAt: string;
  buyerEthAddress: string;
  sellerEthAddress: string;
  nftPrice: number;
  nftId: string;
  status: PaymentStatusEnum;
  meta: {
    paymentUrl?: string;
    sessionId: string;
  };
};

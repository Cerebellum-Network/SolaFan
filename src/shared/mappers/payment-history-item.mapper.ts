import {PaymentHistoryItem} from '../types/payment-history-item';
import {PaymentHistoryItemRaw} from '../types/payment-history-item-raw';

export const paymentHistoryRawToPaymentHistoryMapper = (
  paymentHistoryItem: PaymentHistoryItemRaw,
): PaymentHistoryItem => ({
  id: paymentHistoryItem.id,
  buyerEthAddress: paymentHistoryItem.buyerEthAddress,
  sellerEthAddress: paymentHistoryItem.sellerEthAddress,
  nftPrice: Number(paymentHistoryItem.metadata.nftUsdPriceCents),
  nftId: paymentHistoryItem.metadata.nftId as string,
  status: paymentHistoryItem.status,
  meta: {
    paymentUrl: paymentHistoryItem.metadata.paymentUrl,
    sessionId: paymentHistoryItem.metadata.sessionId,
  },
  updatedAt: paymentHistoryItem.updatedAt,
});

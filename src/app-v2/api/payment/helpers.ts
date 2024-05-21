import {
  PaymentMode,
  QUERY_PARAM_PAYMENT_BUYER_EMAIL,
  QUERY_PARAM_PAYMENT_MODE,
  QUERY_PARAM_PAYMENT_NFT_ID,
  QUERY_PARAM_PAYMENT_ORDER_ID,
  QUERY_PARAM_PAYMENT_QUANTITY,
} from './types';

export const getPopupPaymentUrl = (
  locale: string,
  paymentMode: PaymentMode,
  nftIdIncremental: string,
  orderId: string,
  quantity: string,
  buyerEmail?: string,
): {successUrl: string; cancelUrl: string} => {
  const link = new URL(window.location.origin);
  link.pathname = `/${locale}/service/callback`;
  const cancelUrl = link.href;
  link.searchParams.append('paymentStatus', 'success');

  // In case of redirect mode for payment gateway, it should be handled separately
  if (paymentMode === PaymentMode.WINDOW_REPLACE) {
    const searchParams = new URLSearchParams();
    searchParams.append(QUERY_PARAM_PAYMENT_NFT_ID, nftIdIncremental);
    searchParams.append(QUERY_PARAM_PAYMENT_ORDER_ID, orderId);
    searchParams.append(QUERY_PARAM_PAYMENT_QUANTITY, quantity);
    searchParams.append(QUERY_PARAM_PAYMENT_MODE, paymentMode);
    link.searchParams.append(QUERY_PARAM_PAYMENT_MODE, paymentMode);
    link.searchParams.append('redirectUrl', `${window.location.pathname}?${searchParams.toString()}`);
    if (buyerEmail) {
      searchParams.append(QUERY_PARAM_PAYMENT_BUYER_EMAIL, buyerEmail);
    }
  }

  const successUrl = link.href;
  return {successUrl, cancelUrl};
};

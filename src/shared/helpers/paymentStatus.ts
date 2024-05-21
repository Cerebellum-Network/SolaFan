import {CheckUserHasNftEnum, NftCardInterface, NftTransactionInterface, PaymentStatusEnum} from '@cere/services-types';

export const isHasSuccessTransactions = (nft: NftCardInterface): boolean => {
  const transactions: NftTransactionInterface[] = nft?.transactions || [];

  return (
    transactions.filter((t) => t.paymentStatus && [PaymentStatusEnum.PAYMENT_SUCCESS].includes(t.paymentStatus))
      .length > 0
  );
};

export const isNftPending = (nft: NftCardInterface): boolean => {
  const transactions: NftTransactionInterface[] = nft?.transactions || [];

  const hasPendingTransactions =
    transactions.filter(
      (t) =>
        t.paymentStatus &&
        [
          PaymentStatusEnum.FIAT_PAYMENT_SUCCESS,
          PaymentStatusEnum.TOKEN_TRANSFER_START,
          PaymentStatusEnum.TOKEN_TRANSFER_PENDING,
          PaymentStatusEnum.TOKEN_TRANSFER_SUCCESS,
        ].includes(t.paymentStatus),
    ).length > 0;

  return isHasSuccessTransactions(nft) ? false : hasPendingTransactions;
};

export const isPending = (nft: NftCardInterface): boolean => {
  return nft.purchaseStatus === CheckUserHasNftEnum.USER_PAYMENT_PROCESSING;
};

export const getIsPaymentPrePending = (...statuses: PaymentStatusEnum[]): boolean =>
  statuses.some((status) => status && [PaymentStatusEnum.FIAT_PAYMENT_PENDING].includes(status));

export const getIsPaymentPending = (...statuses: PaymentStatusEnum[]): boolean =>
  statuses.some(
    (status) =>
      status &&
      !getIsPaymentPrePending(status) &&
      !getIsPaymentSuccess(status) &&
      !getIsPaymentFailed(status) &&
      // FIXME please, refer FIAT_PAYMENT_PENDING blocks https://cerenetwork.atlassian.net/browse/DAV-1100
      ![PaymentStatusEnum.INITIAL, PaymentStatusEnum.FIAT_PAYMENT_EXPIRED].includes(status),
  );

export const getIsPaymentSuccess = (...statuses: PaymentStatusEnum[]): boolean =>
  statuses.some((status) =>
    [
      PaymentStatusEnum.TOKEN_TRANSFER_SUCCESS,
      PaymentStatusEnum.PAYMENT_SUCCESS,
      PaymentStatusEnum.FIAT_PAYMENT_SUCCESS,
    ].includes(status),
  );

export const getIsPaymentFailed = (...statuses: PaymentStatusEnum[]): boolean =>
  statuses.some((status) =>
    [
      PaymentStatusEnum.FIAT_REFUND_SUCCESS,
      PaymentStatusEnum.FIAT_PAYMENT_ERROR,
      PaymentStatusEnum.FIAT_REFUND_ERROR,
      PaymentStatusEnum.FIAT_REFUND_PENDING,
      PaymentStatusEnum.UNKNOWN_ERROR,
    ].includes(status),
  );

export const isNewTokenPurchased = (
  prevPaymentStatuses: PaymentStatusEnum[],
  newPaymentStatuses: PaymentStatusEnum[],
): boolean =>
  prevPaymentStatuses.filter((status) => getIsPaymentSuccess(status)).length !==
  newPaymentStatuses.filter((status) => getIsPaymentSuccess(status)).length;

export const waitClosePaymentWindow = (win: Window): Promise<boolean> => {
  // return true if success and false for other cases
  return new Promise((resolve) => {
    const handlePaymentResult = (event: MessageEvent<any>) => {
      const paymentResult = event.data?.paymentResult === true;
      if (paymentResult) {
        window.removeEventListener('message', handlePaymentResult);
        resolve(true);
      }
    };

    window.addEventListener('message', handlePaymentResult);

    const timer = setInterval(() => {
      if (win?.closed) {
        clearInterval(timer);
        window.removeEventListener('message', handlePaymentResult);
        resolve(false);
      }
    }, 500);
  });
};

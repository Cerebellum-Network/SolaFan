import {ReactElement, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {Dispatch} from 'redux';

import {
  PaymentMode,
  QUERY_PARAM_PAYMENT_BUYER_EMAIL,
  QUERY_PARAM_PAYMENT_MODE,
  QUERY_PARAM_PAYMENT_NFT_ID,
  QUERY_PARAM_PAYMENT_ORDER_ID,
  QUERY_PARAM_PAYMENT_QUANTITY,
  QUERY_PARAM_SESSION_ID,
} from '../../../api/payment/types';
import {PurchaseWindowReplaceResultCommand} from '../../../redux/modules/purchase/actions';

type Props = {
  children: ReactElement | ReactElement[];
  showResultModal: (nftId: string, orderId: string, quantity: number, email?: string, sessionId?: string) => void;
};

const PaymentHandler = ({children, showResultModal}: Props) => {
  const {search} = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const redirectUrl = searchParams.get('redirectUrl');
    const paymentMode = searchParams.get(QUERY_PARAM_PAYMENT_MODE);
    const sessionId = searchParams.get(QUERY_PARAM_SESSION_ID);

    if (redirectUrl) {
      const [, queryString] = redirectUrl.split('?');
      const urlSearchParams = new URLSearchParams(queryString);

      const nftId = urlSearchParams.get(QUERY_PARAM_PAYMENT_NFT_ID);
      const orderId = urlSearchParams.get(QUERY_PARAM_PAYMENT_ORDER_ID);
      const buyerEmail = urlSearchParams.get(QUERY_PARAM_PAYMENT_BUYER_EMAIL);
      const quantity = urlSearchParams.get(QUERY_PARAM_PAYMENT_QUANTITY);
      if (paymentMode === PaymentMode.WINDOW_REPLACE && nftId && orderId && quantity && sessionId) {
        const url = new URL(window.location.href);
        url.searchParams.delete(QUERY_PARAM_PAYMENT_MODE);
        url.searchParams.delete(QUERY_PARAM_PAYMENT_NFT_ID);
        url.searchParams.delete(QUERY_PARAM_PAYMENT_ORDER_ID);
        url.searchParams.delete(QUERY_PARAM_PAYMENT_BUYER_EMAIL);
        url.searchParams.delete(QUERY_PARAM_PAYMENT_QUANTITY);
        url.searchParams.delete(QUERY_PARAM_SESSION_ID);

        showResultModal(nftId, orderId, parseInt(quantity), buyerEmail || undefined, sessionId);
        history.push(url.pathname);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showResultModal: (nftId: string, orderId: string, quantity: number, email?: string, sessionId?: string) =>
    dispatch(PurchaseWindowReplaceResultCommand.create(nftId, orderId, quantity, email, sessionId)),
});

export const PaymentHandlerConnected = connect(mapStateToProps, mapDispatchToProps)(PaymentHandler);

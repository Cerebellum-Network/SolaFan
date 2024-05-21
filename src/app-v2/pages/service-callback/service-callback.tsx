import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {ReactElement} from 'react';
import {Redirect, useHistory} from 'react-router-dom';

import {PaymentMode, QUERY_PARAM_PAYMENT_MODE} from '../../api/payment/types';

export function ServiceCallback(): ReactElement {
  const {locale} = useLocalization();
  const history = useHistory();

  if (window.opener) {
    window.opener.postMessage({paymentResult: true});
    return <></>;
  }

  const search = new URLSearchParams(window.location.search);
  const paymentMode = search.get(QUERY_PARAM_PAYMENT_MODE);
  const redirectUrl = search.get('redirectUrl');

  if (paymentMode === PaymentMode.WINDOW_REPLACE && redirectUrl) {
    history.push(redirectUrl);
    return <></>;
  }

  return <Redirect to={`/${locale}/home`} />;
}

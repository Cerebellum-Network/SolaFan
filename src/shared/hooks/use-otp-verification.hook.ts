import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useNotifications} from 'app-v2/hooks/use-notifications';
import {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import analyticService, {AnalyticEventsEnum} from '../services/analytic.service';
import {useAuth} from './auth.hook';

export const useOtpVerification = () => {
  const {t} = useLocalization();
  const history = useHistory();
  const {verifyOtp, setAuthData} = useAuth();
  const {error: errorMessage} = useNotifications();

  const verify = useCallback(
    async (email: string, otp: string) => {
      analyticService.track(AnalyticEventsEnum.SIGN_IN_OTP_SUBMITTED);

      try {
        const keys = await verifyOtp(email, otp);
        setAuthData(email, keys.publicKey, keys.token);
      } catch (e) {
        errorMessage(t('Verification failed'));
      }
    },
    [verifyOtp, setAuthData, errorMessage, t],
  );

  useEffect(() => {
    const currentUrl = new URLSearchParams(history.location.search);
    const otp = currentUrl.get('otp');
    const email = currentUrl.get('email');

    if (email && otp) {
      verify(email, otp);
      history.replace(history.location.pathname);
    }
  }, [history, verify]);
};

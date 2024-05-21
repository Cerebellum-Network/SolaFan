import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import * as EmailValidator from 'email-validator';
import {useCallback, useEffect, useState} from 'react';

import {attachEmail, getUserInfoByToken} from '../services/auth.service';
import {useAuth} from './auth.hook';

export const useTrusted3rdPartyAuth = (userToken: string, email: string) => {
  const {t} = useLocalization();
  const {setAuthData} = useAuth();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, updateLoading] = useState<boolean>(false);

  useEffect(() => {
    handle3rdPartySignIn(userToken, email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attachEmailIfNotEmpty = useCallback(
    async (email: string) => {
      if (!email) {
        return;
      }

      if (!EmailValidator.validate(email)) {
        throw new Error(t('Email provided is not valid!'));
      }

      return attachEmail(email);
    },
    [t],
  );

  const handle3rdPartySignIn = useCallback(
    async (userToken: string, email: string) => {
      updateLoading(true);
      try {
        if (!userToken) {
          throw new Error(t('User token is empty. Impossible to authenticate'));
        }
        const response = await getUserInfoByToken(userToken);
        setAuthData(email, response.publicKey, response.token);
        await attachEmailIfNotEmpty(email);

        setSuccess(true);
      } catch (e) {
        console.error(e);
        setError(t('Something went wrong. Try again later'));
      } finally {
        updateLoading(false);
      }
    },
    [setAuthData, attachEmailIfNotEmpty, t],
  );

  return {error, success, isLoading};
};

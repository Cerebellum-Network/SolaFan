import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useCallback, useEffect, useState} from 'react';

import {getOrCreateByExternalAuthToken} from '../services/auth.service';
import {useAuth} from './auth.hook';
import {buildAuthRedirectUri} from './use-external-auth-button';

export const useExternalAuthCallback = (
  code: string,
): {
  error: string;
  isLoading: boolean;
} => {
  const {t, locale} = useLocalization();
  const [error, setError] = useState<string>('');
  const [isLoading, updateLoading] = useState<boolean>(false);
  const {setAuthData} = useAuth();

  useEffect(() => {
    handleExternalAuthCallback(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExternalAuthCallback = useCallback(
    async (code: string) => {
      updateLoading(true);
      try {
        if (!code) {
          throw new Error(t('Code is required, but empty!'));
        }
        const redirectUri = buildAuthRedirectUri();
        const response = await getOrCreateByExternalAuthToken(code, redirectUri);
        setAuthData(response.email, response.publicKey, response.token);

        if (window.opener) {
          window.opener.location.href = `/${locale}/home`;
          window.close();
        }
      } catch (e) {
        console.error(e);
        setError(t('Something went wrong. Try again later'));
      } finally {
        updateLoading(false);
      }
    },
    [t, setAuthData, locale],
  );

  return {
    error,
    isLoading,
  };
};

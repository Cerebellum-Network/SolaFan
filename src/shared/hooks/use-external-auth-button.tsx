import {externalAuthUrl, webAppUrl} from '../../config/common';

export const buildAuthRedirectUri = () => {
  const redirectUrl = new URL(webAppUrl());
  redirectUrl.pathname = '/en/external-auth-callback';

  return redirectUrl.href;
};

export const useExternalAuthButton = () => {
  const onAuth = () => {
    window.open(
      `${externalAuthUrl()}/login?redirect_uri=${buildAuthRedirectUri()}&response_type=code&done=cere`,
      '',
      'left=100,top=100,width=800,height=600',
    );
  };

  return {
    onAuth,
  };
};

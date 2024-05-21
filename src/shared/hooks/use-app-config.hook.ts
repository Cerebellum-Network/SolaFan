import {useQuery} from '@apollo/client';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';

import {CMS_APP_CONFIG} from '../queries/app-config';
import {AppConfig, defaultAppConfig} from '../types/app-config';

export const useFetchAppConfig = () => {
  const {locale} = useLocalization();
  const {
    data: appConfig,
    loading,
    error,
  } = useQuery<{cmsAppConfig: AppConfig}, {locale: string}>(CMS_APP_CONFIG, {variables: {locale}});

  return {
    appConfig: appConfig?.cmsAppConfig || defaultAppConfig,
    isLoading: loading,
    error: error,
  };
};

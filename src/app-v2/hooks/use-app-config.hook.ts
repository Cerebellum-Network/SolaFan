import {
  selectAppConfig,
  selectAppConfigIsLoading,
  selectAppConfigLoadedSuccessFully,
  selectAppConfigLoadingError,
} from 'app-v2/redux/modules/app-config/selectors';
import {useSelector} from 'react-redux';

export const useAppConfig = () => {
  const appConfig = useSelector(selectAppConfig);
  const isLoading = useSelector(selectAppConfigIsLoading);
  const error = useSelector(selectAppConfigLoadingError);
  const loaded = useSelector(selectAppConfigLoadedSuccessFully);

  return {appConfig, isLoading, loaded, error};
};

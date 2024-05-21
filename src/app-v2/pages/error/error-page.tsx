import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box} from '@material-ui/core';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {ReactComponent as ErrorPicture} from '../../../assets/icons/error.svg';
import {useLocalization} from '../../hooks/use-locale.hook';

const ErrorPage = ({error, resetErrorBoundary}: {error?: Error; resetErrorBoundary?: Function}) => {
  const history = useHistory();
  const {t, locale} = useLocalization();

  useEffect(() => {
    console.error('Error boundary: ', error?.message, error?.stack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onProfilePageClick = () => {
    resetErrorBoundary?.();
    history.push(`/${locale}/home/user/profile`, {pathname: window.location.pathname});
  };

  return (
    <Box className="h-screen flex items-center justify-center">
      <Box className="flex flex-col items-center gap-2">
        <Typography variant="h3">{t('Oops, something went wrong')}</Typography>
        <Typography variant="body1">{t('View the other events and artists while we get this fixed')}</Typography>
        <ErrorPicture />
        <Box className="pt-10">
          <Button variant="contained" size="large" onClick={onProfilePageClick}>
            {t('Go to collector’s profile')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export {ErrorPage};

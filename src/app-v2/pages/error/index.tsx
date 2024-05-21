import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {useEffect, useState} from 'react';

import {useFetchFullEventData} from '../../../shared/hooks/event-data/event-data.hook';
import {useWindowDimensions} from '../../../shared/lib/useWindowDimensions';
import {ReactComponent as ErrorPicture} from '../../assets/svg/error.svg';
import errorNotFoundExhibit from '../../assets/svg/errorNotFoundExhibit.svg';

const useStyles = makeStyles(() => ({
  pb: {
    paddingBottom: '8px',
    textAlign: 'center',
    color: '#6E6E79',
  },
  pbNotFound: {
    paddingBottom: '8px',
    textAlign: 'center',
    color: '##161616',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '26px',
  },
  buttonMobile: {
    backgroundColor: '#000000',
    color: '#ffffff',
    margin: '0 auto',
  },
  button: {
    backgroundColor: '#000000',
    color: '#ffffff',
    margin: '50px auto auto auto',
  },
}));

const getEventSlug = (): string | undefined => {
  const url = new URL(window.location.href);
  const eventQueryName = url.searchParams.get('event');
  if (eventQueryName) {
    return eventQueryName;
  }
  return /home\/exhibit\/([\w-]+)$/.test(url.pathname) ? url.pathname.split('/').pop() : undefined;
};

const ErrorPage = ({error, resetErrorBoundary}: {error: Error; resetErrorBoundary: Function}) => {
  const classes = useStyles();
  const {t} = useLocalization();
  console.error('error', error);

  useEffect(() => {
    // Sentry.captureException(error);
    console.error('Error boundary: ', error.message, error.stack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onHomePageClick = () => {
    resetErrorBoundary();
    window.location.href = '/';
  };

  const onTryAgainClick = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  const slug = getEventSlug();
  const {event} = useFetchFullEventData({slug});

  const [notFoundExhibit, setNotFoundExhibit] = useState(false);
  useEffect(() => {
    if (!event?.id) {
      setNotFoundExhibit(true);
    }
  }, [event]);

  let {isMobile, isDesktop} = useWindowDimensions();

  const getPlatformStyles = () => {
    if (isDesktop) {
      return {width: '568px', height: '346px'};
    }
    if (isMobile) {
      return {width: '343px', height: '209px'};
    }

    return {width: '448px', height: '273px'};
  };

  return (
    <Box
      margin="0 auto"
      padding="0 32px"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Box width="100%">{/*TODO add header here*/}</Box>

      <Box alignSelf="center" display="flex" alignItems="center" flexDirection="column" m="auto">
        <Typography variant="h4" className={notFoundExhibit ? classes.pbNotFound : classes.pb}>
          {notFoundExhibit ? t('Oops, cannot find the exhibit') : t('Oops, something went wrong')}
        </Typography>
        <Typography className={classes.pb}>
          {notFoundExhibit
            ? t('View the other exhibits while we get this fixed')
            : t('In the meantime grab a coffee and chill')}
        </Typography>
        <Box pt="40px">
          {notFoundExhibit ? (
            <img src={errorNotFoundExhibit} style={getPlatformStyles()} alt="error" />
          ) : (
            <ErrorPicture />
          )}
        </Box>
      </Box>

      {notFoundExhibit ? (
        <Button
          variant="contained"
          size="large"
          className={isMobile ? classes.buttonMobile : classes.button}
          onClick={onHomePageClick}
        >
          {t("Back to Collector's profile")}
        </Button>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" size="large" onClick={onHomePageClick}>
            {t("Back to Collector's profile")}
          </Button>
          <Button color="secondary" variant="contained" size="large" onClick={onTryAgainClick}>
            {t('Try again')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export {ErrorPage};

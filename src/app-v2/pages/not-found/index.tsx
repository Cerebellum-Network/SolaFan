import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {Trans} from 'react-i18next';
import {Redirect, useHistory} from 'react-router-dom';

import {ReactComponent as ErrorPicture} from '../../assets/svg/error.svg';
import {useStyles} from './styles';

const deprecatedNotLocalizedPaths = [
  '/home',
  '/marketplace',
  '/exhibits',
  '/notifications',
  '/service/callback',
  '/creators',
  '/not-found',
  '/home/auth',
  '/home/external-auth',
  '/home/user/wallet/deposit',
  '/home/user/wallet/transfer',
  '/home/user/wallet',
  '/home/user/nfts',
  '/home/auth/signup',
  '/home/auth/signin',
];

export const NotFoundPage = () => {
  const {t, locale} = useLocalization();
  const history = useHistory();
  const classes = useStyles();
  const onHomePageClick = () => {
    window.location.href = '/';
  };
  const onTryAgainClick = () => {
    window.location.reload();
  };

  if (deprecatedNotLocalizedPaths.includes(history.location.pathname)) {
    // TODO: add support for paths with params
    return <Redirect to={`/${locale}${history.location.pathname}`} />;
  }

  return (
    <Box width="100vw">
      <Box className={classes.notFoundContent}>
        <Box alignSelf="center" display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h4" className={classes.notFoundTitle}>
            <Trans i18nKey="Ooops, <br /> something went wrong" />
          </Typography>
          <Typography className={classes.pb}>{t('In the meantime grab a coffee and chill')}</Typography>
          <Box className={classes.errorImage}>
            <ErrorPicture />
          </Box>
        </Box>
        <Box className={classes.buttonBlock}>
          <Button variant="contained" size="large" onClick={onHomePageClick} className={classes.buttons}>
            <Typography variant="h4" className={classes.backButton}>
              {t("Back to Collector's profile")}
            </Typography>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={onTryAgainClick}
            className={classes.buttons}
          >
            {t('Try again')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

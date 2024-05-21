import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {SnackbarContent, useSnackbar, VariantType} from 'notistack';
import {useCallback} from 'react';

import {ReactComponent as CircleIcon} from '../../app-v2/assets/svg/attentionSign.svg';
import {ReactComponent as CloseIcon} from '../../app-v2/assets/svg/close.svg';
import {ReactComponent as TriangleIcon} from '../../assets/icons/ic-warning.svg';
import colors from '../../styles/colors'; // TODO: move to v2 folder in the future
import {useLocalization} from './use-locale.hook';

const useStyles = makeStyles<Theme>((theme) => ({
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '16px',
    gap: '8px',
    background: colors.light,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    borderRadius: '12px',
    minWidth: '343px',

    [theme.breakpoints.up('md')]: {
      minWidth: '688px',
    },

    [theme.breakpoints.up('lg')]: {
      minWidth: '618px',
    },
  },
  messageError: {
    borderLeft: `5px solid ${colors.error}`,
  },
  messageWarning: {
    borderLeft: `5px solid ${colors.darkYellow}`,
  },
  icon: {
    width: '18px',
    height: '17px',
    marginLeft: '6px',
  },
  errorIcon: {
    '& path': {
      fill: colors.error,
    },
  },
  close: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    cursor: 'pointer',
    backdropFilter: 'blur(54px)',
    borderRadius: '50%',
    background: colors.lighter,
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: '8px',
    height: '8px',
  },
  variantTitle: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: colors.primaryDark,
    marginLeft: '9px',
  },
  titleBlock: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type Messenger = (message: string) => void;

export const useNotifications = (): {
  success: Messenger;
  warning: Messenger;
  error: Messenger;
  info: Messenger;
} => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const classes = useStyles();
  const {t} = useLocalization();

  const showMessage = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        content: (key) => {
          const handleCloseSnackbar = () => closeSnackbar(key);

          return (
            <SnackbarContent>
              <Box
                className={clsx(classes.message, variant === 'error' ? classes.messageError : classes.messageWarning)}
              >
                {variant === 'error' ? (
                  <Box className={classes.titleBlock}>
                    <TriangleIcon className={clsx(classes.icon, classes.errorIcon)} />
                    <span className={classes.variantTitle}>{t('Error')}</span>
                  </Box>
                ) : (
                  <Box className={classes.titleBlock}>
                    <CircleIcon className={classes.icon} />
                    <span className={classes.variantTitle}>{t('Warning')}</span>
                  </Box>
                )}

                <Typography>{message}</Typography>

                <Box onClick={handleCloseSnackbar} className={classes.close}>
                  <CloseIcon className={classes.closeIcon} />
                </Box>
              </Box>
            </SnackbarContent>
          );
        },
      });
    },
    [enqueueSnackbar, closeSnackbar, classes, t],
  );

  const success = useCallback(
    (message: string) => {
      showMessage(message, 'success');
    },
    [showMessage],
  );

  const info = useCallback(
    (message: string) => {
      showMessage(message, 'info');
    },
    [showMessage],
  );

  const error = useCallback(
    (message: string) => {
      showMessage(message, 'error');
    },
    [showMessage],
  );

  const warning = useCallback(
    (message: string) => {
      showMessage(message, 'warning');
    },
    [showMessage],
  );

  return {success, error, info, warning};
};

import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {Trans} from 'react-i18next';

import colors from '../../../../styles/colors'; // TODO move to v2 folder
import {ReactComponent as CheckIcon} from '../../../assets/svg/check.svg';
import {useLocalization} from '../../../hooks/use-locale.hook';

export interface ConfirmationModalProps {
  onClick: () => void;
}

export const useConfirmationStyles = makeStyles((theme) => ({
  confirmationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: '19px',
    height: '19px',
    marginTop: '23px',
    marginBottom: '13px',

    [theme.breakpoints.up('md')]: {
      width: '22px',
      height: '22px',
      marginTop: '35px',
      marginBottom: '15px',
    },
  },
  title: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',

    [theme.breakpoints.up('md')]: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '26px',
    },
  },
  message: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    marginTop: '4px',
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  button: {
    width: '200px',
    height: '36px',
    border: '1px solid #161616',
    borderRadius: '50px',
    margin: '24px auto 0 auto',

    '&:hover': {
      backgroundColor: colors.light,
    },

    [theme.breakpoints.up('md')]: {
      width: '282px',
      height: '48px',
      margin: '32px auto 0 auto',
    },
  },
  buttonText: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    textTransform: 'none',
  },
}));

export const ConfirmationModalContent = ({onClick}: ConfirmationModalProps) => {
  const confirmationStyles = useConfirmationStyles();
  const {t} = useLocalization();

  return (
    <Box className={confirmationStyles.confirmationContainer}>
      <CheckIcon className={confirmationStyles.checkIcon} />
      <Typography className={confirmationStyles.message}>
        <Trans i18nKey="You have subscribed for the latest updates from the artist" />
      </Typography>
      <Button variant="outlined" className={confirmationStyles.button} onClick={onClick}>
        <Typography className={confirmationStyles.buttonText}>{t('Ok')}</Typography>
      </Button>
    </Box>
  );
};

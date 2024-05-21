import {Box, makeStyles, Typography} from '@material-ui/core';
import {ArrowForwardIos as Arrow, CheckCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as ShoppingCart} from './assets/shoppingCart.svg';
import {ReactComponent as Currency} from './assets/usdcFilled.svg';
import {ReactComponent as Wallet} from './assets/wallet.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    paddingBottom: '42px',

    [theme.breakpoints.up('lg')]: {
      paddingBottom: '112px',
    },
  },
  header: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    marginBottom: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '29px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '36px',
      lineHeight: '26px',
      marginBottom: '32px',
    },
  },
  stepsWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '12px',
    [theme.breakpoints.up('lg')]: {
      height: '130px',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      gap: '28px',
    },
  },
  stepWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '85px 85px 24px 85px',

    [theme.breakpoints.up('lg')]: {
      borderRadius: '12px',
      padding: '32px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 0,
    },
  },
  stepService: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  stepIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    order: 1,
    height: '68px',
    width: '68px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',

    [theme.breakpoints.up('lg')]: {
      order: 2,
      borderRadius: 'unset',
      height: 'unset',
      width: 'unset',
      border: 'none',
    },
  },
  stepIcon: {
    '& path': {
      fill: theme.palette.info.main,
    },
    width: '24px',
    height: '24px',
  },
  stepNumber: {
    order: 2,
    fontSize: '20px',
    fontFamily: 'Montserrat',
    fontWeight: 800,
    color: theme.palette.grey[700],
    opacity: '50%',
    marginLeft: '13px',

    [theme.breakpoints.up('lg')]: {
      order: 1,
      marginLeft: 0,
    },
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.up('lg')]: {
      paddingTop: '8px',
    },
  },
  stepInfo: {
    order: 3,
    maxWidth: '183px',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '14px',

    display: 'flex',
    alignItems: 'center',
    marginLeft: '17px',

    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
    },

    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
      maxWidth: '210px',
      fontSize: '14px',
      lineHeight: '17px',
      whiteSpace: 'normal',
    },
  },
  linkArrow: {
    order: 4,
    height: '12px',
    marginLeft: '13px',

    '& path': {
      fill: theme.palette.info.main,
    },
  },
  link: {
    color: theme.palette.info.main,
    textDecoration: 'underline',
    cursor: 'pointer',

    [theme.breakpoints.up('lg')]: {
      inlineSize: 'min-content',
      minWidth: '148px',
    },
  },
}));

type Props = {
  onSellNfts: () => void;
  onOpenProfile: () => void;
};

export const GetStarted = memo(({onSellNfts, onOpenProfile}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();

  const steps = useMemo(
    () => [
      {
        name: t('Connect your wallet'),
        onClick: onOpenProfile,
        icon: <Wallet className={classes.stepIcon} />,
      },
      {name: t('Top it up with USDC on Polygon Network'), icon: <Currency className={classes.stepIcon} />},
      {
        name: t('Ready to place your bid or purshase exclusive NFTs!'),
        icon: <CheckCircle className={classes.stepIcon} />,
      },
      {
        name: t('Sell your NFTs on marketplace'),
        onClick: onSellNfts,
        icon: <ShoppingCart className={classes.stepIcon} />,
      },
    ],
    [onOpenProfile, onSellNfts, classes, t],
  );

  return (
    <Box className={classes.container}>
      <Typography className={classes.header}>{t('Start collecting & selling NFTs')}</Typography>
      <Box className={classes.stepsWrapper}>
        {steps.map((step, index) => (
          <Box key={index} className={classes.stepWrapper}>
            <Box className={classes.stepService}>
              <Box className={classes.stepNumber}>0{index + 1}</Box>
              <Box className={classes.stepIconWrapper}>{step.icon}</Box>
            </Box>
            <Box className={classes.infoWrapper}>
              {step.onClick ? (
                <>
                  <Typography className={clsx(classes.stepInfo, classes.link)} onClick={step.onClick}>
                    {step.name}
                  </Typography>
                  <Arrow className={classes.linkArrow} />
                </>
              ) : (
                <Typography className={classes.stepInfo}>{step.name}</Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

import {Box, Theme} from '@material-ui/core';
import {Button, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {StyledLink} from '../../../../components/primitives/StyledLink';
import {ROUTES} from '../../../../constants/routes';
import {ReactComponent as CoinsIcon} from './assets/coins.svg';
import {ReactComponent as RightTopImage} from './assets/rightTopImage.svg';
import valueProposition from './assets/valueProposition.png';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '32px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  rightTopImage: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '150px',
      height: '150px',
      position: 'absolute',
      top: 0,
      right: 0,
      overflow: 'hidden',
      borderRadius: '0 32px 0 0',
    },
    [theme.breakpoints.up('lg')]: {
      width: '170px',
      height: '170px',
    },
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '48px',
    [theme.breakpoints.up('md')]: {
      padding: '80px 10px 40px 25px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 100px 10px 5px',
    },
  },
  image: {
    minWidth: '241px',
    maxWidth: '241px',
    backgroundOrigin: 'border-box',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('lg')]: {
      minWidth: '400px',
      maxWidth: '400px',
    },
  },
  contentInfo: {
    maxWidth: '620px',
    padding: '20px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
    },
  },
  infoHeader: {
    fontWeight: 800,
    fontSize: '28px',
    lineHeight: '36px',
    paddingTop: '6px',
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '32px',
      lineHeight: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '68px',
      lineHeight: '82px',
    },
  },
  infoText: {
    marginTop: '12px',
    opacity: 0.7,
    fontSize: '14px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
    },
  },
  infoButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      marginTop: '28px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '40px',
    },
  },
  button: {
    textTransform: 'none',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '162px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '223px',
    },
  },
  buttonBrowse: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
}));

export const ValueProposition = () => {
  const {t, i18n} = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <RightTopImage className={classes.rightTopImage} />

      <Box className={classes.imageBox}>
        <img className={classes.image} src={valueProposition} alt="" />
      </Box>

      <Box className={classes.contentInfo}>
        <CoinsIcon />
        <Typography className={classes.infoHeader}>
          {t('Unique NFT')} <br /> {t('Experiences')}
        </Typography>
        <Typography className={classes.infoText}>
          {t(
            'More than just an NFT collectible, DaVinci NFTs unlock exclusive experiences from hand selected creators especially for you.',
          )}
        </Typography>
        <Box className={classes.infoButtons}>
          <StyledLink to={generatePath(ROUTES.EVENTS, {locale: i18n.language})}>
            <Button size="large" variant="contained" className={clsx(classes.button, classes.buttonBrowse)}>
              {t('Browse exhibits')}
            </Button>
          </StyledLink>
          <StyledLink to={generatePath(ROUTES.USER_NFTS, {locale: i18n.language})}>
            <Button size="large" color="secondary" variant="outlined" className={classes.button}>
              {t('Sell')}
            </Button>
          </StyledLink>
        </Box>
      </Box>
    </Box>
  );
};

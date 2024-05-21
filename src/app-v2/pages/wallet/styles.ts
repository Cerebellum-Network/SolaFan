import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '832px',
      minWidth: '832px',
    },
  },
  title: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 800,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '30px',
      lineHeight: '40px',
    },
  },
  walletTitleBox: {
    paddingTop: '24px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '40px',
    },
  },
  walletBox: {
    padding: '20px 0 24px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '343px',
      marginBottom: '24px',
      paddingTop: '4px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 0 40px',
      maxWidth: '343px',
    },
  },
  walletElement: {
    padding: '24px 16px',
    backgroundColor: theme.palette.grey[200],
    borderRadius: '12px',
    height: '100%',
  },
  walletAddressElement: {
    padding: '16px 16px 8px',
    [theme.breakpoints.up('md')]: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  nftsTitleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nftsBox: {
    padding: '16px 0',
    [theme.breakpoints.up('md')]: {
      padding: '20px 0 40px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '24px 0 80px',
    },
  },
}));

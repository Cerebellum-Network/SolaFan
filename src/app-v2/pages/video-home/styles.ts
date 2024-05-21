import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  bannerBox: {
    paddingBottom: 36,
    [theme.breakpoints.up('md')]: {
      paddingTop: 24,
      paddingBottom: 48,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 40,
      paddingBottom: 64,
    },
  },
  nftCollectiblesBox: {
    paddingTop: 50,
    [theme.breakpoints.up('md')]: {
      paddingTop: 78,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 120,
    },
  },
  showMoreBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: 32,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 24,
    },
  },
  showMoreButton: {
    textTransform: 'none',
  },
  getStartedBox: {
    paddingTop: 48,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 110,
    },
  },
}));

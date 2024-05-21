import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  bannerBox: {
    paddingBottom: '36px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '24px',
      paddingBottom: '48px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '40px',
      paddingBottom: '64px',
    },
  },
  exhibitsBox: {
    paddingTop: '36px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '28px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '80px',
    },
  },
  creatorsBox: {
    paddingTop: '50px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '34px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '80px',
    },
  },
  valuePropositionBox: {
    paddingTop: '50px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '64px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '80px',
    },
  },
  nftCollectiblesBox: {
    paddingTop: '50px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '78px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '120px',
    },
  },
  showMoreBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '24px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '32px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '24px',
    },
  },
  showMoreButton: {
    textTransform: 'none',
  },
  getStartedBox: {
    paddingTop: '48px',
    [theme.breakpoints.up('lg')]: {
      paddingTop: '110px',
    },
  },
}));

import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  titlesBox: {
    paddingTop: '24px',
  },
  trendingListingsBox: {
    paddingTop: '16px',

    [theme.breakpoints.up('md')]: {
      paddingTop: '20px',
    },
  },
  nftCollectiblesBox: {
    padding: '24px 0',
    [theme.breakpoints.up('md')]: {
      padding: '40px 0',
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
}));

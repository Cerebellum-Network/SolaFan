import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainTitle: {
    paddingTop: '32px',
    paddingBottom: '8px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '64px',
    },
  },
  subTitle: {
    paddingBottom: '8px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '24px',
    },
  },
  filters: {
    padding: '24px 0',
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
  upcomingExhibitTickets: {
    padding: '48px 0',
    [theme.breakpoints.up('md')]: {
      padding: '52px 0',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '64px 0',
    },
  },
}));

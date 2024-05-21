import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  sectionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '1000px',
      margin: 'auto',
    },
  },
  section: {
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: theme.palette.common.white,
  },
  acordionDetails: {
    padding: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
  },
  button: {
    width: '100%',
    height: '48px',
    [theme.breakpoints.up('md')]: {
      width: '319px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '240px',
    },
  },
  collectiblesBox: {
    paddingTop: '40px',
    paddingBottom: '34px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '48px',
      maxWidth: '1000px',
      margin: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '80px',
      paddingBottom: '100px',
    },
  },
  collectiblesTitle: {
    paddingBottom: '16px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '24px',
      maxWidth: '1000px',
      margin: 'auto',
    },
  },
}));

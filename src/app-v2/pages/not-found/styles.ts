import {makeStyles} from '@material-ui/core';
import colors from 'styles/colors';

export const useStyles = makeStyles((theme) => ({
  pb: {
    paddingBottom: '8px',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.lightGrey,
  },
  notFoundTitle: {
    paddingBottom: '8px',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '26px',

    [theme.breakpoints.up('lg')]: {
      fontWeight: 800,
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  notFoundContent: {
    maxWidth: '480px',
    margin: '0 auto 0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '70px 15px 32px 15px',
    height: 'calc(100vh - 56px)',

    [theme.breakpoints.up('md')]: {
      padding: '180px 15px 32px 15px',
      height: 'calc(100vh - 72px)',
    },

    [theme.breakpoints.up('lg')]: {
      padding: '144px 15px 32px 15px',
    },
  },
  buttons: {
    minWidth: '164px',
    [theme.breakpoints.up('md')]: {
      minWidth: '206px',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '184px',
    },
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '120px',
  },
  backButton: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: colors.black,
  },
  errorImage: {
    paddingTop: '30px',
    [theme.breakpoints.up('lg')]: {
      paddingTop: '10px',
      '& svg': {
        width: '230px',
        height: '230px',
      },
    },
  },
}));

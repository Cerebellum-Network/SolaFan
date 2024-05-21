import './css/plyr.css';
import './css/styles.css';

import {makeStyles} from '@material-ui/core';

import colors from './colors';

export const useStyles = makeStyles(() => ({
  snackBar: {
    marginTop: '35px',
  },
  errorMessage: {
    display: 'flex',
    padding: '12px',
    background: 'rgba(255, 81, 81, 0.1)',
    borderRadius: '12px',
    marginBottom: '16px',
    color: colors.error,
  },
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

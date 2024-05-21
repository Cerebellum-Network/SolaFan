import {makeStyles} from '@material-ui/core';
import colors from 'styles/colors';

export const useStyles = makeStyles((theme) => ({
  controlsContainer: {
    paddingTop: '20px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '32px',
    },
  },
  emptyListContainer: {
    minHeight: '270px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPageLoaderWrapper: {
    color: colors.lightGrey,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '32px',
  },
  circularProgress: {
    color: 'inherit',
  },
}));

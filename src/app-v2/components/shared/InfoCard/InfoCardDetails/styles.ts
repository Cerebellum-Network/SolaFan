import {makeStyles} from '@material-ui/core';

import colors from '../../../../../styles/colors';

export const useStyles = makeStyles((theme) => ({
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  },
  accent: {
    color: colors.primaryDark,
  },
  accentInactive: {
    opacity: '0.6',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  qtyOwnedLabel: {
    width: 'fit-content',
    color: colors.snowWhite,
    backgroundColor: theme.palette.info.main,
    borderRadius: '4px',
    height: '22px',
    padding: '1px 8px',
    margin: '3px 0 7px 0',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  },
}));

export const useStylesNftDetails = makeStyles((theme) => ({
  infoWrapper: {
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      marginBottom: '12px',
    },
  },
  price: {
    [theme.breakpoints.up('lg')]: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '26px',
    },
  },
  priceText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
  },
}));

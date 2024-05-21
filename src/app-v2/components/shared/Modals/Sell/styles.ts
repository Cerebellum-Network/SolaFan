import {makeStyles} from '@material-ui/core';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';

export const useSellModalStyles = makeStyles((theme) => ({
  subTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '16px 0',
  },
  tabsBox: {
    paddingBottom: '24px',
  },
  fieldsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
    },
  },
  field: {
    flexGrow: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
    },
  },
  infoBox: {
    padding: '16px 0 24px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoText: {
    position: 'relative',
    fontSize: '16px',
    lineHeight: '24px',
    paddingLeft: '16px',

    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '8px',
      display: 'block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: theme.palette.info.main,
    },
  },
  infoIcon: {
    color: theme.palette.info.main,
  },
  buttonsBox: {
    [mobileLandscapeMediaQuery(theme)]: {
      width: '400px',
      marginLeft: 'auto',
    },
  },
  button: {
    height: '36px',
    textTransform: 'none',
  },
}));

import {makeStyles, Theme} from '@material-ui/core';
import colors from 'styles/colors';

export const useStyles = makeStyles<Theme, {url: string | undefined; isLandscape?: boolean}>((theme) => ({
  main: {
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    color: '#f8f8fa',
    width: '100%',
    padding: '0 16px',
    overflow: 'auto',
    backgroundImage: ({url}) =>
      url ? `linear-gradient(180.01deg, rgba(15, 52, 9, 0) -24.15%, #010A18 92.88%), url(${url})` : undefined,
    backgroundSize: 'cover',

    [theme.breakpoints.up('md')]: {
      padding: '0 36px',
    },
    scrollBehavior: 'smooth',
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto 60px auto',
      maxWidth: '1280px',
      minWidth: '1280px',
    },
  },

  pointer: {
    marginBottom: '30px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  moreIcon: {
    background: '#161616',
    marginTop: '1px',
    transition: 'transform 100ms ease-out',
  },
  moreIconRotate: {
    transform: 'rotate(180deg)',
  },
  title: {
    position: 'fixed',
    left: '66px',
    top: '14px',
    zIndex: 1,
    maxWidth: 'calc(100% - 230px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  button: {
    background: 'linear-gradient(87.67deg, #92FE9D 3.35%, #00C9FF 109.43%)',
    borderRadius: '50px',
    transform: 'scale(1)',
    animation: '$pulse 2s infinite',
    border: '1.5px solid rgba(146, 254, 157, 0.7)',
    borderWidth: '1.5px',
    borderImageSlice: '1',
    color: colors.primaryDark,
    display: 'block',
    padding: '8px 16px',
    order: 3,
    margin: '-4px 0 4px 0',

    '& p': {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '22px',
    },

    '&:hover': {
      border: '1.5px solid #F8F8FA',
    },

    [theme.breakpoints.up('md')]: {
      padding: ({isLandscape}) => (isLandscape ? '8px 16px' : '13px 69px'),
      order: 3,
      margin: 'unset',
    },
  },
  titleNextExhibit: {
    order: 1,
    [theme.breakpoints.down('md')]: {
      display: ({isLandscape}) => (!isLandscape ? 'none' : 'inherit'),
    },

    [theme.breakpoints.down('lg')]: {
      fontWeight: ({isLandscape}) => (isLandscape ? 700 : 800),
      fontSize: ({isLandscape}) => (isLandscape ? '20px' : '32px'),
      lineHeight: ({isLandscape}) => (isLandscape ? '26px' : '40px'),
      color: colors.light,
    },
    [theme.breakpoints.up('lg')]: {
      fontWeight: 800,
      fontSize: '48px',
      lineHeight: '58px',
    },
  },
  replayIcon: {
    marginRight: '8px',
    [theme.breakpoints.up('lg')]: {
      width: '20px',
      height: '17px',
    },
  },
  replayBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.lighter,
    marginLeft: ({isLandscape}) => (isLandscape ? 'auto' : '0'),
    order: 2,

    [theme.breakpoints.up('md')]: {
      marginTop: '-14px',
      order: ({isLandscape}) => (isLandscape ? 2 : 3),
    },

    [theme.breakpoints.up('lg')]: {
      marginTop: '-24px',
    },
  },
  nextExhibitContainer: {
    maxWidth: ({isLandscape}) => (isLandscape ? 'inherit' : '343px'),
    minWidth: '343px',
    margin: '32px auto 0 auto',
    display: 'flex',
    alignItems: ({isLandscape}) => (isLandscape ? 'baseline' : 'center'),
    padding: '20px 24px',
    background: 'rgba(22, 22, 22, 0.6)',
    backdropFilter: 'blur(33px)',
    borderRadius: '12px',
    gap: '24px',
    flexDirection: ({isLandscape}) => (isLandscape ? 'row' : 'column'),

    [theme.breakpoints.up('md')]: {
      maxWidth: '688px',
      minWidth: '688px',
      padding: '32px 24px 32px 24px',
      gap: '32px',
      margin: '32px auto 60px auto',
    },

    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
      minWidth: '1280px',
      gap: '40px',
      margin: '32px auto 60px auto',
      flexDirection: 'column',
    },
  },

  gridHided: {
    display: ({isLandscape}) => (isLandscape ? 'none' : 'inherit'),
    [theme.breakpoints.up('md')]: {
      width: '688px',
      margin: '0 auto',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none !important',
    },
  },
  curatedRowHided: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    [theme.breakpoints.down('lg')]: {
      display: ({isLandscape}) => (isLandscape ? 'inherit' : 'none'),
    },
  },
  titleRow: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '26px',
    color: colors.light,
    margin: '30px auto 16px auto',
    maxWidth: '343px',

    [theme.breakpoints.up('md')]: {
      fontWeight: 800,
      fontSize: '28px',
      lineHeight: '36px',
      margin: '36px auto 20px auto',
      maxWidth: 'unset',
    },
  },
  card: {
    '&.MuiPaper-root': {
      width: '343px',
      height: '343px',
      '& .MuiCardMedia-root': {
        width: '343px',
        height: '343px',
      },
    },

    [theme.breakpoints.up('md')]: {
      '&.MuiPaper-root': {
        width: '328px',
        height: '328px',
        '& .MuiCardMedia-root': {
          width: '328px',
          height: '328px',
        },
      },
    },
  },
}));

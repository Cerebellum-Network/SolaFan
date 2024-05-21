import {alpha, makeStyles, Theme} from '@material-ui/core';

export const useMainStyles = makeStyles<Theme, {isHovered: boolean}>((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '16px 16px 40px 16px',
    [theme.breakpoints.up('md')]: {
      padding: '32px 26px 48px 26px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '40px 40px 64px 40px',
      display: 'grid',
      gridTemplateColumns: '60% 40%',
    },
    backgroundImage: ({isHovered}) =>
      isHovered
        ? `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`
        : `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
    transition: 'all 100ms linear',
  },
  infoButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
  infoButtonIcon: {
    color: theme.palette.info.main,
  },
  infoContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hoverImageBlock: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    position: 'relative',
  },
  badgeBox: {
    width: 'fit-content',
  },
  bottomElement: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '26px',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('md')]: {
      fontWeight: 800,
      fontSize: '36px',
      lineHeight: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      fontWeight: 800,
      fontSize: '48px',
      lineHeight: '40px',
    },
  },
  subTitle: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('md')]: {
      paddingTop: '12px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '12px',
      fontSize: '16px',
    },
  },
  description: {
    paddingTop: '24px',
    color: theme.palette.primary.light,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  controlBox: {
    paddingTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minWidth: '125px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      gap: '20px',
    },
  },
  button: {
    textTransform: 'none',
  },
  blackBadge: {
    backgroundColor: theme.palette.grey[900],
  },
}));

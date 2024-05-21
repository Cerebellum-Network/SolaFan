import {makeStyles, Theme} from '@material-ui/core';

import colors from '../../../../styles/colors';

export const useStyles = makeStyles<Theme, {bannerImage?: string}>((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      width: 'fit-content',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
      width: 'max-content',
    },
  },
  mobileShareButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktopShareButton: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    backgroundColor: 'rgba(22, 22, 22, 0.75)',
    borderColor: 'transparent',
    [theme.breakpoints.up('lg')]: {
      bottom: 'unset',
      left: 'unset',
      transform: 'unset',
      top: '48px',
      right: '88px',
    },
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '0 16px 0',
    [theme.breakpoints.up('md')]: {
      // padding: '0',
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-end',
      // padding: '0 0 50px 60px',
    },
  },
  displayOnMobile: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  hideOnMobile: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none !important',
    },
  },
  playerBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: '0 16px 16px',
    [theme.breakpoints.up('md')]: {
      padding: '0',
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
    },
  },
  eventTitle: {
    width: '100%',
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    padding: '18px 0 18px 40px',
    borderBottom: '1px solid #E0E0E7',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '16px 0',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '16px',
    },
    '& > svg': {
      marginRight: '4px',
    },
  },
  eventInfoBlock: {
    width: '100%',

    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '12.5px 80px 8px 40px',
    },
  },
  eventInfoBoldText: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  eventInfoGrayText: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.0075em',
    color: '#6E6E79',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: '12px',
    },
  },
  redText: {
    color: 'rgba(255, 79, 89, 1)',
  },
  description: {
    width: '100%',
    borderTop: '1px solid #E0E0E7',
    [theme.breakpoints.down('sm')]: {
      marginTop: '12px',
      paddingTop: '12px',
    },
  },
  eventInfo: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
    },
  },
  morePopularExhibitsBox: {
    padding: '48px 0',
    [theme.breakpoints.up('md')]: {
      padding: '60px 0',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '80px 0',
    },
  },
  badgeBox: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '4px',
    width: 'fit-content',
    padding: '4px 8px',
    '& > svg': {
      marginRight: '4px',
    },
  },
  badgeText: {
    color: colors.white,
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '14.2px',
  },
}));

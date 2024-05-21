import {makeStyles, Theme} from '@material-ui/core';

import colors from '../../../../styles/colors';

export const useMenuStyles = makeStyles<Theme>((theme) => ({
  avatar: {
    cursor: 'pointer',
    height: '36px',
    width: '36px',
    marginRight: '4px',
    display: 'inline',
    '& svg': {
      cursor: 'pointer',
      height: '38px',
      width: '38px',
      padding: '0',
    },
  },
  landscapePaper: {
    position: 'relative',
    width: '100vw',
    minWidth: '100vw',
    maxWidth: '100vw',
    minHeight: 'calc(100vh + 24px)',
    marginTop: '-24px',
    marginLeft: '-16px',
    paddingBottom: '24px',
    backgroundColor: theme.palette.background.paper,
  },
  paperDesktop: {
    width: '343px',
    minWidth: '343px',
    maxWidth: '343px',
    marginTop: '36px',
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    position: 'relative',
    width: '100vw',
    minWidth: '100vw',
    maxWidth: '100vw',
    minHeight: 'calc(100vh + 24px)',
    marginTop: '-24px',
    marginLeft: '-16px',
    paddingBottom: '24px',
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '343px',
      minWidth: '343px',
      maxWidth: '343px',
      minHeight: 'unset',
      marginTop: '-6px',
      marginLeft: 'calc(50vw - 12px)',
      borderRadius: '12px',
      backgroundColor: theme.palette.background.paper,
    },
  },
  avatarIcon: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  menuIcon: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

export const useMenuListStyles = makeStyles<Theme, {height?: number}>((theme) => ({
  menu: {
    minWidth: '100%',
    width: '100%',
    minHeight: ({height}) => (!!height && height > 0 ? `${height}px` : 'unset'),
    [theme.breakpoints.up('md')]: {
      borderRadius: '12px',
      paddingTop: '10px',
      minHeight: 'fit-content !important',
    },
  },
  userInfoBlock: {
    marginBottom: '0px',
    marginTop: '16px',

    [theme.breakpoints.up('md')]: {
      marginTop: 'unset',
      marginBottom: '16px',
    },
  },
  signIcon: {
    marginTop: '12px',
  },
  disableItem: {
    color: colors.disable,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  menuItemText: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  collapsibleHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  activeItem: {
    fontWeight: 700,
    color: colors.primaryDark,
  },
  inActiveItem: {
    fontWeight: 500,
  },
  link: {
    textDecoration: 'none',
    color: colors.primaryDark,
    margin: 'auto 0',
  },
  menuItem: {
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft: '3px',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      height: '20px',
      width: '20px',
      margin: '6px 14px 6px 2px',
    },
  },
  menuItemRoot: {
    '&:hover': {
      backgroundColor: 'transparent',
    },

    '& span': {
      display: 'none',
    },
  },
  cartIcon: {
    '& svg': {
      height: '22px',
      width: '23px',
      margin: '6px 14px 6px 0',
    },
  },
  avatar: {
    height: '48px',
    width: '48px',
    marginRight: '18px',
    cursor: 'pointer',
    '& svg': {
      cursor: 'pointer',
      height: '49px',
      width: '49px',
      padding: '0',
    },
  },
  arrow: {
    transform: 'rotate(-90deg)',
  },
  arrowOpen: {
    transform: 'rotate(90deg)',
  },
  userName: {
    display: 'block',
    width: '200px',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.black,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 96px)',
    },
  },
  userBalance: {
    color: colors.lightGrey,
    fontWeight: 500,
    fontSize: '14px',
  },
  userBalanceLoader: {
    height: '12px',
    width: '12px',
    margin: '0',
  },
  close: {
    position: 'absolute',
    right: '16px',
    cursor: 'pointer',
    padding: '16px',
    backdropFilter: 'blur(54px)',
    borderRadius: '50%',
    background: '#E0E0E7',
    width: '30px',
    height: '30px',
  },
  mobileClose: {
    cursor: 'pointer',
    borderRadius: '50%',
    background: '#E0E0E7',
    width: '30px',
    height: '30px',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  closeIconContainer: {
    top: '15px',
  },
  closeIcon: {
    right: '10px',
    top: '10px',
    minWidth: '12px',
    height: '12px',

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
    },
  },
  divider: {
    marginTop: '14px',
    marginBottom: '14px',
  },
  guestDivider: {
    margin: '10px 16px 14px 16px',
  },
  guest: {
    display: 'none',
  },
  userDivider: {
    margin: '14px 16px',
  },
  userWalletsBlock: {
    padding: '6px 16px 1px 16px',
  },
  walletsBlock: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    margin: '24px 19px 14px 19px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'unset',
  },
  comingSoonLabel: {
    display: 'inline',
    marginLeft: '12px',
    marginRight: '10px',
    borderRadius: '30px',
    color: colors.snowWhite,
    backgroundColor: theme.palette.info.main,
    height: '20px',
    padding: '3px 7px 4px 7px',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '14px',
  },
  defaultMenu: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '26px',
    paddingLeft: '2px',

    [theme.breakpoints.down('md')]: {
      marginTop: '14px',
      marginBottom: '14px',
    },
  },
  activeSignInButton: {
    display: 'block',
    background: theme.palette.info.main,
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    width: '100%',
    height: '44px',
  },
  defaultSignInButton: {
    display: 'block',
    color: colors.black,
    borderColor: colors.black,
    '&:focus': {
      borderColor: colors.black,
    },
    background: colors.snowWhite,
    border: `1px solid ${colors.primaryDark}`,
    borderRadius: '30px',
    width: '100%',
    height: '44px',
    marginBottom: '4px',
  },
  signInText: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
  },
  text: {
    color: colors.lightGrey,
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '20px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  menuDesktop: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  menuMobile: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sellNftsLabel: {
    display: 'inline',
    minWidth: '72px',
    minHeight: '24px',
  },
  mobileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    width: '100vw',
    height: '54px',
    background: colors.snowWhite,
    borderBottom: `1px solid ${colors.lighter}`,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  backArrow: {
    marginLeft: '10px',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

export const useAccountStyles = makeStyles((theme) => ({
  listContainer: {
    padding: '0 16px 14px 42px',
  },
  link: {
    textDecoration: 'none',
    color: colors.primaryDark,
    margin: 'auto 0',
  },
  title: {
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 500,
    paddingLeft: '12px',
  },
  activeItem: {
    fontWeight: 700,
    color: colors.primaryDark,
  },
  iconContainer: {
    height: '20px',
    width: '22px',
    display: 'flex',
  },
  bellIcon: {
    width: '15px',
    height: '18px',
    margin: 'auto',
  },
  newNotificationsMarker: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    marginLeft: '12px',
    backgroundColor: theme.palette.secondary.main,
  },
  menuItem: {
    margin: '-6px 0 16px -18px',
  },
}));

export const arrowStyle = {width: '12px', height: '12px'};

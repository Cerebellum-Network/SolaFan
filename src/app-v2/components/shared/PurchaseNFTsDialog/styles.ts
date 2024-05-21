import {makeStyles, Theme} from '@material-ui/core';

import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';

export const useStyles = makeStyles<Theme, {isOpenNftDetail?: boolean}>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    maxHeight: ({isOpenNftDetail}) => (isOpenNftDetail ? 'none' : '100%'),
    height: ({isOpenNftDetail}) => (isOpenNftDetail ? '' : '100%'),
    overflow: ({isOpenNftDetail}) => (isOpenNftDetail ? '' : 'hidden'),
  },
  nftDetail: {
    width: '100%',
    transition: 'all .1s linear',
  },
  nftsList: {
    height: ({isOpenNftDetail}) => (isOpenNftDetail ? 'auto' : '80%'),
    overflow: ({isOpenNftDetail}) => (isOpenNftDetail ? 'none' : 'scroll'),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: ({isOpenNftDetail}) => (isOpenNftDetail ? '12px' : '16px'),
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      gap: ({isOpenNftDetail}) => (isOpenNftDetail ? '12px' : '24px'),
    },
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      gap: '12px',
    },
  },
  showToggleButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  showToggleButtonText: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
    },
  },
  showToggleButtonIcon: {
    color: theme.palette.primary.light,
    transition: 'all .1s linear',
  },
  rotateIcon: {
    transform: 'rotate(180deg)',
  },
}));

export const useDialogStyles = makeStyles<Theme, {isOpenNftDetail?: boolean}>(() => ({
  paper: {
    maxWidth: 'unset',
    backgroundColor: 'unset',
    boxShadow: 'none',
    overflowY: ({isOpenNftDetail}) => (isOpenNftDetail ? 'auto' : 'unset'),
  },
  scrollPaper: {
    alignItems: 'flex-end',
  },
}));

export const useExclusiveCardStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    gap: '12px',
    padding: '8px',
    borderRadius: '12px',
    backgroundColor: theme.palette.grey[900],
    border: '1px solid transparent',
    [theme.breakpoints.up('md')]: {
      gap: '16px',
      padding: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      padding: '16px 24px',
    },
    transition: 'all .1s linear',
  },
  rootSmall: {
    padding: '12px',
  },
  rootSelected: {
    borderColor: theme.palette.info.light,
  },
  imageBox: {
    position: 'relative',
    width: '50%',
    minWidth: '50%',
    maxWidth: '50%',
    height: '190px',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    flexGrow: 2,
    [theme.breakpoints.up('md')]: {
      width: '182px',
      minWidth: '182px',
      maxWidth: '182px',
      height: '210px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '328px',
      minWidth: '328px',
      maxWidth: '328px',
      height: '379px',
      maxHeight: '100%',
    },
    transition: 'all .1s linear',
  },
  imageBoxSmall: {
    width: '100px',
    maxWidth: '100px',
    minWidth: '100px',
    height: '100px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoBox: {
    maxHeight: '100%',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      minWidth: '230px',
    },
  },
  secondInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      justifyContent: 'unset',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'column',
      justifyContent: 'unset',
    },
    transition: 'all .1s linear',
  },
  secondInfoBoxSmal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    paddingBottom: '4px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 800,
    },
    transition: 'all .1s linear',
  },
  titleSmall: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  price: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    paddingTop: '2px',
    transition: 'all .1s linear',
  },
  priceSmall: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '26px',
    },
  },
  actionButton: {
    [theme.breakpoints.up('md')]: {
      width: '175px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
    transition: 'all .1s linear',
  },
  actionButtonSmall: {
    width: '90px',
    [theme.breakpoints.up('md')]: {
      width: '80px',
    },
  },
}));

export const useNftDetailStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: theme.palette.grey[900],
    [theme.breakpoints.up('lg')]: {
      borderRadius: '20px',
    },
  },
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      gap: '16px',
      padding: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      gap: '24px',
    },
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
    borderRadius: '12px 12px 0 0',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      borderRadius: '12px',
      width: '328px',
      height: '370px',
      paddingBottom: 'unset',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      width: '182px',
      height: '210px',
    },
  },
  imageBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    objectFit: 'cover',
  },
  infoBox: {
    flexGrow: 2,
    padding: '30px 8px',
    [theme.breakpoints.up('lg')]: {
      padding: 0,
    },
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    [theme.breakpoints.up('lg')]: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 800,
    },
  },
  badgeBox: {
    padding: '5px 0 8px',
  },
  nftCount: {
    paddingBottom: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  bottomBox: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: '12px',
  },
  price: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    paddingTop: '2px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '28px',
      lineHeight: '36px',
    },
  },
  buttonBox: {
    width: '120px',
    [theme.breakpoints.up('lg')]: {
      width: '140px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      width: '140px',
    },
  },
}));

export const useNftDetailAuctionInfoStyles = makeStyles((theme) => ({
  moreInfoHeader: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 8px',
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '16px',
    },
  },
  moreInfoButton: {
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'none',
    color: theme.palette.info.main,
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  moreInfoBox: {
    paddingBottom: '16px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      paddingBottom: '16px',
    },
  },
  rotateIcon: {
    transform: 'rotate(180deg)',
  },
  infoTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    paddingLeft: '12px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  notificationBlock: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 352px)',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      width: 'calc(100% - 214px)',
    },
  },
  isHighestBid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: '12px',
    lineHeight: '22px',
    color: theme.palette.primary.light,
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: theme.palette.info.dark,
  },
  bidsHeadCell: {
    color: theme.palette.grey[700],
  },
  bidsCell: {
    color: `${theme.palette.primary.light} !important`,
  },
}));

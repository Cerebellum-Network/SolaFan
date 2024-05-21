import {makeStyles, Theme} from '@material-ui/core';

export const useStyles = makeStyles<Theme, {eventBackgroundUrl?: string}>((theme) => ({
  imageBlock: {
    overflow: 'hidden',
    position: 'relative',
    '& > div > .cere-video-wrapper > div > button': {
      display: 'none !important',
    },
    '& > div > .cere-video-wrapper > div > .plyr__controls > button.plyr__control': {
      '&:hover': {
        background: 'transparent !important',
      },
    },
    '& > div > video': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      minHeight: '200px',
      height: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      '& > div > .cere-video-wrapper > div > .plyr__video-wrapper': {
        minHeight: '416px',
      },
    },
  },
  backgroundImage: {
    backgroundImage: ({eventBackgroundUrl}) => `url(${eventBackgroundUrl})`,
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '0 15%',
    [theme.breakpoints.down('lg')]: {
      padding: '10% 15% 5%',
    },
    '& > img': {
      objectFit: 'cover',
      height: 'inherit',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maxHeight: '343px',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '500px',
    },
  },
  playerActionsSection: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'rgba(22, 22, 22, 0.6)',
    padding: '8px',
  },
  eventSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  playButton: {
    padding: '0 !important',
  },
  downloadContent: {
    position: 'absolute',
    right: '12px',
    top: '54px',
  },
  videoContainer: {
    minHeight: '200px',
    minWidth: '100%',
    overflow: 'hidden',
    margin: 'auto',
  },
  content: {
    '& > video > div': {
      marginRight: '0',
    },
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '300px',
    width: '100%',
  },
}));

import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import {memo, useCallback, useRef, useState} from 'react';

import {ReactComponent as PlayIcon} from './play.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '2px solid rgba(248, 248, 250, 0.1)',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 22, 22, 0.7)',
    [theme.breakpoints.up('md')]: {
      width: '56px',
      height: '56px',
    },
  },
  playIcon: {
    width: '15px',
    [theme.breakpoints.up('md')]: {
      width: '26px',
    },
  },
  titlesBox: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    padding: '12px',
    [theme.breakpoints.up('md')]: {
      padding: '16px',
    },
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.primary.light,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      fontWeight: 700,
    },
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.primary.light,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '4px',
  },
}));

type Props = {
  poster?: string;
  title?: string;
  subTitle?: string;
  videoSrc?: string;
};

export const TeaserPlayer = memo(({poster, subTitle, title, videoSrc}: Props) => {
  const styles = useStyles();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = useCallback(() => setPlaying(true), []);
  const handlePause = useCallback(() => setPlaying(false), []);
  const playPauseVideo = useCallback(() => {
    if (videoRef.current?.muted) {
      videoRef.current.muted = false;
    }

    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <Box className={styles.root}>
      {!playing && (
        <Box className={styles.titlesBox}>
          <Typography className={styles.title}>{title}</Typography>
          <Typography className={styles.subTitle}>{subTitle}</Typography>
        </Box>
      )}

      {!playing && (
        <IconButton className={styles.playButton} onClick={playPauseVideo}>
          <PlayIcon className={styles.playIcon} />
        </IconButton>
      )}

      <video
        ref={videoRef}
        onClick={playPauseVideo}
        poster={poster}
        onPause={handlePause}
        onPlay={handlePlay}
        className={styles.video}
        crossOrigin="anonymous"
      >
        {typeof videoSrc === 'string' && videoSrc !== '' && <source src={videoSrc} type="video/mp4" />}
      </video>
    </Box>
  );
});

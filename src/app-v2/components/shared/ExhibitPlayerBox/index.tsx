import {ExhibitCardInterface} from '@cere/services-types';
import {Box, Button, Dialog, makeStyles, Toolbar} from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import {memo, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useTriggerState} from '../../../hooks/useTriggerState';
import {AuctionOverlay} from '../../connected/AuctionOverlay';
import {ButtonPulsating} from '../../primitives/ButtonPulsating';
import {Skeleton} from '../../primitives/Skeleton';
import {MediaPlayer} from '../MediaPlayer';
import {ReactComponent as InfoIcon} from './assets/infoFilled.svg';
import {ReactComponent as PlayIcon} from './assets/play.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  posterBox: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    padding: '2px',
    background:
      'linear-gradient(226.34deg, rgba(244, 104, 129, 0.8) 15.52%, rgba(243, 102, 130, 0.8) 16.27%, rgba(231, 69, 150, 0.8) 29.76%, rgba(224, 49, 162, 0.8) 41.02%, rgba(221, 42, 166, 0.8) 48.62%, rgba(82, 16, 226, 0.8) 77.78%)',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  posterSkeletonBox: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    background: theme.palette.common.white,
  },
  playButtonBox: {
    position: 'absolute',
    bottom: '45%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  playButton: {
    width: '150px',
    padding: '4px',
    '&:disabled': {
      '& circle': {
        fill: theme.palette.text.disabled,
      },
    },
  },
  playButtonSkeleton: {
    width: '150px',
    height: '48px',
    borderRadius: '24px',
  },
  toolbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(22, 22, 22, 0.6)',
    backdropFilter: 'blur(11px)',
  },
  backButton: {
    cursor: 'pointer',
    color: theme.palette.common.white,
  },
  aboutExhibitButton: {
    backgroundColor: theme.palette.grey[700],
    borderColor: 'transparent',
  },
  purchaseButtonBox: {
    position: 'fixed',
    bottom: '50px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const useDialogStyles = makeStyles(() => ({
  paper: {
    maxHeight: '100%',
    minHeight: '100%',
    '& > div': {
      maxHeight: '100%',
    },
  },
  scrollPaper: {
    maxHeight: '100%',
    minHeight: '100%',
  },
}));

type Props = {
  poster?: string;
  videoSrc: string;
  accessToken?: string;
  openPurchaseNFTs: () => void;
  openAboutExhibit?: () => void;
  openEndVideo: () => void;
  playTrigger: boolean;
  onPlayAgain: any;
  showOverlay: boolean;
  event: ExhibitCardInterface;
};

export const ExhibitPlayerBox = memo(
  ({
    poster,
    videoSrc,
    accessToken,
    openPurchaseNFTs,
    openAboutExhibit,
    openEndVideo,
    playTrigger,
    onPlayAgain,
    showOverlay,
    event,
  }: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();
    const dialogStyles = useDialogStyles();

    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [pauseTrigger, onPauseTrigger] = useTriggerState();

    const handleOpenVideoDialog = useCallback(() => setOpenVideoDialog(true), []);
    const handleCloseVideoDialog = useCallback(() => setOpenVideoDialog(false), []);

    const handleOpenPurchaseNFTs = useCallback(() => {
      onPauseTrigger();
      openPurchaseNFTs();
    }, [onPauseTrigger, openPurchaseNFTs]);

    const handleOpenAboutExhibit = useCallback(() => {
      openAboutExhibit?.();
      onPauseTrigger();
    }, [onPauseTrigger, openAboutExhibit]);

    const onPlayback = useCallback(
      (time: number) => {
        if (time < 100) {
          return;
        }
        onPauseTrigger();
        openEndVideo();
      },
      [onPauseTrigger, openEndVideo],
    );

    return (
      <Box className={styles.root}>
        <Box className={styles.posterBox}>
          {!accessToken ? (
            <Box className={styles.posterSkeletonBox}>
              <Skeleton variant="rect" className={styles.poster} />
            </Box>
          ) : (
            <img src={poster} className={styles.poster} alt="" />
          )}
        </Box>
        <Box className={styles.playButtonBox}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayIcon />}
            className={styles.playButton}
            onClick={handleOpenVideoDialog}
            disabled={!accessToken}
          >
            {t('Play content')}
          </Button>
        </Box>

        <Dialog fullScreen open={openVideoDialog} classes={dialogStyles}>
          {showOverlay ? (
            <AuctionOverlay event={event} eventLoading={false} />
          ) : (
            <MediaPlayer
              src={videoSrc}
              autoplay
              onPlayback={onPlayback}
              playTrigger={playTrigger}
              pauseTrigger={pauseTrigger}
              onEnd={onPlayAgain}
            />
          )}

          <Toolbar className={styles.toolbar}>
            <ArrowBackIos className={styles.backButton} onClick={handleCloseVideoDialog} />

            <Button
              variant="contained"
              color="secondary"
              className={styles.aboutExhibitButton}
              startIcon={<InfoIcon />}
              onClick={handleOpenAboutExhibit}
            >
              {t('About Exhibit')}
            </Button>
          </Toolbar>

          <Box className={styles.purchaseButtonBox}>
            <ButtonPulsating onClick={handleOpenPurchaseNFTs}>{t('Purchase exclusive NFTs')}</ButtonPulsating>
          </Box>
        </Dialog>
      </Box>
    );
  },
);

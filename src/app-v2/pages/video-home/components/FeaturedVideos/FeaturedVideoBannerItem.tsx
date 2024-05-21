import {Box, Collapse, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';

import {useHover} from '../../../../hooks/useHover';
import {VideoMetadata} from '../../../../redux/modules/videos/types';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import playerIcon from './player-icon.svg';
import {useMainStyles} from './styles';

export const useStyles = makeStyles(() => ({
  playButton: {
    width: 264,
    height: 48,
    borderRadius: 264,
    background: '#00b272',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0 6px',
  },
}));

type Props = {
  video: VideoMetadata;
  onClick?: () => unknown;
};

export const FeaturedVideoBannerItem = memo(({video, onClick = () => null}: Props) => {
  const [hoverRef, isHovered] = useHover();
  const mainStyles = useMainStyles({isHovered});
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();

  return (
    <div className={mainStyles.root} ref={hoverRef}>
      <Box className={mainStyles.infoContainer}>
        <Box className={mainStyles.bottomElement}>
          <Box className={mainStyles.infoBox}>
            <Typography className={mainStyles.title}>{video.videoTitle}</Typography>
          </Box>

          <Collapse in={isHovered && isDesktop}>
            <Typography className={mainStyles.description}>{video.videoDescription}</Typography>
          </Collapse>
        </Box>
        <button onClick={onClick} className={styles.playButton}>
          <img src={playerIcon} width={40} height={40} alt="" />
          Watch with subscription
        </button>
      </Box>
    </div>
  );
});

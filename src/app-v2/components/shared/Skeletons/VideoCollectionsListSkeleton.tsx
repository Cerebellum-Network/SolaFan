import {Box, makeStyles, Theme} from '@material-ui/core';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {VideoCollectionCardSkeleton} from './VideoCollectionCardSkeleton';

const useStyles = makeStyles<Theme, {count: number}>((theme) => ({
  box: {
    display: 'grid',
    paddingTop: 16,
    gap: 32,
    gridTemplateColumns: ({count}) => `repeat(${count}, 1fr)`,

    [theme.breakpoints.down('md')]: {
      maxWidth: '316px',
      gap: 16,
      paddingTop: 16,
      margin: '0 auto',
    },
  },
}));

export const VideoCollectionsListSkeleton = () => {
  const {isMobile, isTablet} = useThemeBreakpoints();
  const sceletonsCount = isMobile ? 1 : isTablet ? 2 : 3;

  const styles = useStyles({count: sceletonsCount});

  return (
    <Box className={styles.box}>
      {Array(sceletonsCount)
        .fill(0)
        .map((_, index) => (
          <Box key={index}>
            <VideoCollectionCardSkeleton />
          </Box>
        ))}
    </Box>
  );
};

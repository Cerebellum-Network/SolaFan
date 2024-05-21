import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    paddingBottom: '24px',
  },
  imageBox: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    padding: '2px',
    background:
      'linear-gradient(226.34deg, rgba(244, 104, 129, 0.8) 15.52%, rgba(243, 102, 130, 0.8) 16.27%, rgba(231, 69, 150, 0.8) 29.76%, rgba(224, 49, 162, 0.8) 41.02%, rgba(221, 42, 166, 0.8) 48.62%, rgba(82, 16, 226, 0.8) 77.78%)',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  playButton: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '48px',
    borderRadius: '24px',
    backgroundColor: theme.palette.common.white,
  },
}));

export const ExhibitPlayerSkeleton = () => {
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <Skeleton variant="rect" className={styles.image} />
      </Box>
      <Box className={styles.playButton} />
    </Box>
  );
};

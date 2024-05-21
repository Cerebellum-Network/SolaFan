import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '12px',
    overflow: 'hidden',
    minWidth: '100px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, .12);',
  },
  imageBox: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    display: 'block',
    height: 'auto',
    aspectRatio: '16 / 9',
  },
  infoBox: {
    padding: '12px',
  },
  text: {
    width: '70%',
    marginBottom: '1rem',
  },
  subText: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export const VideoCollectionCardSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <Skeleton variant="rect" className={styles.image} />
      </Box>

      <Box className={styles.infoBox}>
        <Skeleton className={styles.text} variant="text" />
        <Skeleton variant="text" className={styles.subText} />
      </Box>
    </Box>
  );
};

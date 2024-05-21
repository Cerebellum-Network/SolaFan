import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '12px',
    overflow: 'hidden',
    minWidth: '100px',
  },
  imageBox: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  infoBox: {
    padding: '12px',
  },
  text: {
    width: '100%',
    height: '22px',
    borderRadius: '4px',
    marginBottom: '6px',
  },
  button: {
    width: '100%',
    height: '48px',
    borderRadius: '24px',
    marginTop: '12px',
  },
}));

export const CardTicketSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <Skeleton variant="rect" className={styles.image} />
      </Box>

      <Box className={styles.infoBox}>
        <Skeleton variant="text" className={styles.text} />

        <Skeleton variant="text" className={styles.text} />

        <Skeleton variant="rect" className={styles.button} />
      </Box>
    </Box>
  );
};

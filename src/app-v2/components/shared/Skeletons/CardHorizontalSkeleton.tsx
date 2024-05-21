import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    height: '100px',
    minWidth: '100px',
    maxWidth: '100px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  infoBox: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  botttomInfoBox: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    width: '120px',
    height: '45px',
    borderRadius: '12px',
  },
  price: {
    width: '70px',
    height: '22px',
    borderRadius: '4px',
  },
  button: {
    width: '80px',
    height: '34px',
    borderRadius: '17px',
  },
}));

export const CardHorizontalSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Skeleton variant="rect" className={styles.image} />
      <Box className={styles.infoBox}>
        <Skeleton variant="rect" className={styles.title} />
        <Box className={styles.botttomInfoBox}>
          <Skeleton variant="rect" className={styles.price} />
          <Skeleton variant="rect" className={styles.button} />
        </Box>
      </Box>
    </Box>
  );
};

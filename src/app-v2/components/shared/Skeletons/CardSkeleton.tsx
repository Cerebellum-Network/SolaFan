import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
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
  creator: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    width: '50%',
  },
  creatorLogo: {
    width: '24px',
    height: '24px',
    marginRight: '0.5rem',
  },
  creatorTitle: {
    flexGrow: 2,
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
  buyBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  button: {
    width: '50%',
    height: '44px',
    borderRadius: '22px',

    [theme.breakpoints.down('md')]: {
      width: '60%',
      height: '36px',
      borderRadius: '18px',
    },
  },
}));

export const CardSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <Skeleton variant="rect" className={styles.image} />
      </Box>

      <Box className={styles.infoBox}>
        <Box className={styles.creator}>
          <Skeleton className={styles.creatorLogo} variant="circle" />
          <Skeleton className={styles.creatorTitle} variant="text" />
        </Box>
        <Skeleton className={styles.text} variant="text" />
        <Skeleton variant="text" className={styles.subText} />
        <Box className={styles.buyBox}>
          <Skeleton variant="text" className={styles.buttonText} />
          <Skeleton className={styles.button} variant="rect" />
        </Box>
      </Box>
    </Box>
  );
};

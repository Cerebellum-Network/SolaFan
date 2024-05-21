import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: 0,
    height: '375px',
    [theme.breakpoints.up('md')]: {
      width: '652px',
      height: '440px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1200px',
    },
  },
  rootSkeleton: {
    height: '375px',
    [theme.breakpoints.up('md')]: {
      height: '440px',
    },
  },
  svipersBox: {
    position: 'absolute',
    bottom: '20px',
    left: '5%',
    width: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridColumnGap: '5px',
  },
  sviper: {
    height: '2px',
    borderRadius: '1px',
    backgroundColor: theme.palette.grey[400],
  },
  button: {
    position: 'absolute',
    bottom: '54px',
    left: '5%',
    height: '44px',
    width: '168px',
    borderRadius: '22px',
    backgroundColor: theme.palette.grey[400],
  },
}));

export const HomePageBannerSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Skeleton variant="rect" className={styles.rootSkeleton} />
      <Box className={styles.svipersBox}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Box key={index} className={styles.sviper} />
          ))}
      </Box>
      <Box className={styles.button} />
    </Box>
  );
};

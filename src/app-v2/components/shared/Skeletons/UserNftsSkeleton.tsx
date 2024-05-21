import {Box, Grid, makeStyles} from '@material-ui/core';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
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
    padding: '8px',
  },
  title: {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
  },
  subTitle: {
    width: '80%',
    height: '20px',
    borderRadius: '4px',
  },
  price: {
    width: '40px',
    height: '22px',
    borderRadius: '4px',
  },
}));

export const UserNftsSkeleton = () => {
  const styles = useStyles();
  const {isMobile} = useThemeBreakpoints();

  return (
    <Grid container spacing={isMobile ? 2 : 4}>
      {Array(4)
        .fill(0)
        .map((nft) => (
          <Grid key={nft.id} item xs={6} md={4} lg={2}>
            <Box className={styles.root}>
              <Box className={styles.imageBox}>
                <Skeleton variant="rect" className={styles.image} />
              </Box>
              <Box className={styles.infoBox}>
                <Skeleton className={styles.title} variant="text" />
                <Skeleton className={styles.subTitle} variant="text" />
                <Skeleton className={styles.price} variant="rect" />
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

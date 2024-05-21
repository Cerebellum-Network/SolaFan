import {Box, Grid, makeStyles} from '@material-ui/core';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  gridBox: {
    paddingTop: '1rem',
  },
  item: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
    overflow: 'hidden',
    width: '100%',
    minHeight: '273px',

    [theme.breakpoints.up('md')]: {
      minHeight: '276px',
    },

    [theme.breakpoints.up('lg')]: {
      minHeight: '285px',
    },
  },
  iconBox: {
    position: 'absolute',
    top: '90px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '2rem',

    height: '153px',
    [theme.breakpoints.up('md')]: {
      height: '156px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '165px',
    },
  },
  creatorName: {
    marginTop: '8px',
    borderRadius: '4px',
  },
  creatorDesc: {
    marginTop: '8px',
    borderRadius: '12px',
  },
}));

export const CreatorsRowSkeleton = () => {
  const {isMobile, isTablet} = useThemeBreakpoints();
  const sceletonsCount = isMobile ? 1 : isTablet ? 2 : 3;

  const styles = useStyles();

  return (
    <Grid container spacing={isMobile ? 2 : 4} className={styles.gridBox}>
      {Array(sceletonsCount)
        .fill(0)
        .map((_, index) => (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <Box className={styles.item} key={index}>
              <Skeleton variant="rect" height={120} />
              <Box className={styles.iconBox}>
                <Skeleton variant="circle" width={60} height={60} />
              </Box>
              <Box className={styles.textBox}>
                <Skeleton variant="rect" className={styles.creatorName} width={142} height={20} />
                <Skeleton variant="rect" className={styles.creatorDesc} width={280} height={48} />
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

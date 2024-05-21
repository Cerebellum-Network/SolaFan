import {Grid, makeStyles} from '@material-ui/core';

import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {CardSkeleton} from './CardSkeleton';

const useStyles = makeStyles((theme) => ({
  gridBox: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '316px',
      paddingTop: '8px',
      margin: '0 auto',
    },
  },
}));

export const NftsListSkeleton = () => {
  const {isMobile, isTablet} = useThemeBreakpoints();
  const sceletonsCount = isMobile ? 1 : isTablet ? 2 : 3;

  const styles = useStyles();

  return (
    <Grid container spacing={2} className={styles.gridBox}>
      {Array(sceletonsCount)
        .fill(0)
        .map((_, index) => (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <CardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
};

import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles(() => ({
  element: {
    width: '46px',
    height: '64px',
    borderRadius: '12px',
  },
}));

export const SocialNetworksInfoSkeleton = () => {
  const styles = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box mr={3}>
        <Skeleton className={styles.element} variant="rect" />
      </Box>
      <Box mr={3}>
        <Skeleton className={styles.element} variant="rect" />
      </Box>
      <Box mr={3}>
        <Skeleton className={styles.element} variant="rect" />
      </Box>
      <Box mr={3}>
        <Skeleton className={styles.element} variant="rect" />
      </Box>
      <Box>
        <Skeleton className={styles.element} variant="rect" />
      </Box>
    </Box>
  );
};

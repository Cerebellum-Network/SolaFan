import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';
import {SocialNetworksInfoSkeleton} from './SocialNetworksInfoSkeleton';

const useStyles = makeStyles(() => ({
  creator: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    paddingTop: '18px',
    paddingBottom: '12px',
  },
  avatar: {
    minWidth: '32px',
    height: '32px',
    borderRadius: '50%',
  },
  name: {
    width: '120px',
    height: '22px',
    borderRadius: '4px',
  },
}));

export const EventCreatorSkeleton = () => {
  const styles = useStyles();

  return (
    <Box>
      <Box className={styles.creator}>
        <Skeleton variant="circle" className={styles.avatar} />
        <Skeleton variant="rect" className={styles.name} />
      </Box>
      <SocialNetworksInfoSkeleton />
    </Box>
  );
};

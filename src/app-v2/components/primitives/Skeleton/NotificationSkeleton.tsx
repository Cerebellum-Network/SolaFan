import {Box, makeStyles} from '@material-ui/core';
import {Skeleton} from 'app-v2/components/primitives/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '16px',
  },
  image: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    marginRight: '12px',
  },
  text: {
    width: '220px',
    height: '22px',
    borderRadius: '8px',
    marginBottom: '4px',
  },
  date: {
    width: '100px',
    height: '16px',
    borderRadius: '4px',
  },
}));

export const NotificationSkeleton = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Skeleton variant="rect" className={styles.image} />
      <Box>
        <Skeleton variant="rect" className={styles.text} />
        <Skeleton variant="rect" className={styles.date} />
      </Box>
    </Box>
  );
};

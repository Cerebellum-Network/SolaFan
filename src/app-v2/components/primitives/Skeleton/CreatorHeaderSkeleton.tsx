import {Box, makeStyles} from '@material-ui/core';
import {Skeleton} from 'app-v2/components/primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  background: {
    height: 120,

    [theme.breakpoints.up('md')]: {
      height: '440px',
    },

    [theme.breakpoints.up('lg')]: {
      height: '440px',
    },
  },
  iconBox: {
    '--size': '100px',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 48%)',
    width: 'var(--size)',
    height: 'var(--size)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up('md')]: {
      '--size': '178px',
    },
  },
  icon: {
    '--size': '96px',
    width: 'var(--size)',
    height: 'var(--size)',

    [theme.breakpoints.up('md')]: {
      '--size': '162px',
    },
  },
  creatorName: {
    '--top': '60px',
    '--height': '24px',
    '--width': '146px',
    width: 'var(--width)',
    height: 'var(--height)',
    borderRadius: '4px',
    margin: 'var(--top) auto 0 auto',

    [theme.breakpoints.up('md')]: {
      '--width': '320px',
      '--height': '36px',
      '--top': '100px',
    },
  },
}));

export const CreatorHeaderSkeleton = () => {
  const styles = useStyles();

  return (
    <>
      <Box className="relative">
        <Skeleton variant="rect" className={styles.background} />
        <Box className={styles.iconBox}>
          <Skeleton className={styles.icon} variant="circle" />
        </Box>
      </Box>
      <Skeleton className={styles.creatorName} variant="rect" />
    </>
  );
};

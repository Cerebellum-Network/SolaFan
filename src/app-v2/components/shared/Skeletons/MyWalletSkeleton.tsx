import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  balanceBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titlesBox: {
    flexGrow: 2,
  },
  title: {
    height: '24px',
    width: '50%',
    borderRadius: '4px',
    marginBottom: '2px',
  },
  subTitle: {
    height: '18px',
    width: '50%',
    borderRadius: '4px',
  },
  icon: {
    width: '40px',
    minWidth: '40px',
    height: '40px',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '24px',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  button: {
    width: '100%',
    height: '48px',
    borderRadius: '24px',
  },
}));

export const MyWalletSkeleton = () => {
  const styles = useStyles();

  return (
    <Box>
      <Box className={styles.balanceBox}>
        <Box className={styles.titlesBox}>
          <Skeleton variant="text" className={styles.title} />
          <Skeleton variant="text" className={styles.subTitle} />
        </Box>
        <Skeleton variant="circle" className={styles.icon} />
      </Box>
      <Box className={styles.buttonsBox}>
        <Skeleton variant="rect" className={styles.button} />
        <Skeleton variant="rect" className={styles.button} />
      </Box>
    </Box>
  );
};

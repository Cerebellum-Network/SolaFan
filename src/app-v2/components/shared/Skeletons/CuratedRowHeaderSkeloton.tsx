import {Box, makeStyles, Typography} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titlesBox: {
    '&:not(:empty)': {
      paddingBottom: '16px',
      [theme.breakpoints.up('lg')]: {
        paddingBottom: '24px',
      },
    },
  },
  headerButtons: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      minHeight: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      width: '140px',
      paddingRight: '24px',
      paddingBottom: '24px',
    },
  },
  headerButton: {
    width: '44px',
    height: '44px',
  },
}));

type Props = {
  title?: string;
  subTitle?: string;
  showButtons?: boolean;
};

export const CuratedRowHeaderSkeloton = ({title, subTitle, showButtons = true}: Props) => {
  const styles = useStyles();
  return (
    <Box className={styles.header}>
      <Box className={styles.titlesBox}>
        {title && <Typography variant="h2">{title}</Typography>}
        {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
      </Box>
      {showButtons && (
        <Box className={styles.headerButtons}>
          <Skeleton variant="circle" className={styles.headerButton} />
          <Skeleton variant="circle" className={styles.headerButton} />
        </Box>
      )}
    </Box>
  );
};

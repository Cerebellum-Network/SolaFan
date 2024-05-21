import {Box, makeStyles} from '@material-ui/core';

import {Skeleton} from '../../primitives/Skeleton';

const useStyles = makeStyles(() => ({
  searchTitle: {
    width: '70px',
    height: '16px',
    borderRadius: '4px',
  },
  searchResultBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: ' 8px 0',
  },
  searchOneResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  searchOneResultImage: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
  },
  searchOneResultText: {
    width: '150px',
    height: '16px',
    borderRadius: '4px',
  },
}));

export const SearchSkeleton = () => {
  const styles = useStyles();

  return (
    <>
      <Skeleton variant="rect" className={styles.searchTitle} />
      <Box className={styles.searchResultBlock}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Box className={styles.searchOneResult} key={index}>
              <Skeleton variant="rect" className={styles.searchOneResultImage} />
              <Skeleton variant="rect" className={styles.searchOneResultText} />
            </Box>
          ))}
      </Box>
    </>
  );
};

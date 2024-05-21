import {Box, CircularProgress} from '@material-ui/core';

import {useStyles} from './styles';

export const Loader = () => {
  const styles = useStyles({});
  return (
    <Box className={styles.loaderContainer}>
      <CircularProgress size="30px" />
    </Box>
  );
};

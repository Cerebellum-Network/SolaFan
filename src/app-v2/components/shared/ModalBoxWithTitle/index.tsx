import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo, ReactNode} from 'react';

import {CloseButton} from '../../primitives/CloseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '24px 16px 20px',
    [theme.breakpoints.up('md')]: {
      padding: '24px 24px 20px',
    },
  },
  headerTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
  },
  container: {
    padding: '16px',
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
  },
}));

type Props = {
  title: string;
  children: NonNullable<ReactNode>;
  onClose?: () => void;
};

export const ModalBoxWithTitle = memo(({title, children, onClose}: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Typography className={styles.headerTitle}>{title}</Typography>
        {onClose && <CloseButton onClick={onClose} />}
      </Box>
      <Box className={styles.container}>{children}</Box>
    </Box>
  );
});

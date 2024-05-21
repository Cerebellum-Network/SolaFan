import {Box, makeStyles} from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {ReactNode} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    minHeight: '48px',
    maxHeight: '48px',
    cursor: 'wait',
  },
  icon: {
    color: theme.palette.grey[700],
  },
}));

type Props = {
  title?: NonNullable<ReactNode>;
};

export const AccordionSkeleton = ({title}: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      {title}
      <ArrowDownIcon className={styles.icon} />
    </Box>
  );
};

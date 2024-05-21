import {IconButton, IconButtonProps, makeStyles} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[700],
    backgroundColor: theme.palette.grey[300],
    width: '30px',
    height: '30px',
  },
}));

export const CloseButton = (props: IconButtonProps) => {
  const styles = useStyles();

  return (
    <IconButton className={clsx(styles.root, props.className)} {...props}>
      <Close />
    </IconButton>
  );
};

import {InputBase, InputBaseProps, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {memo} from 'react';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '310px',
    height: '44px',
    borderRadius: '22px',
    padding: '14px 20px',
    backgroundColor: theme.palette.grey[200],
    fontSize: '14px',
  },
}));

export const RoundedInput = memo(({className, ...props}: InputBaseProps) => {
  const styles = useStyles();
  return <InputBase className={clsx(styles.searchInput, className)} {...props} />;
});

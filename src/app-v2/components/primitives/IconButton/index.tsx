import {IconButton as MuiIconButton, IconButtonProps, makeStyles} from '@material-ui/core';
import {memo, ReactElement} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30px',
    height: '30px',
    padding: '2px',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  sizeSmall: {
    width: '24px',
    height: '24px',
  },
}));

type Props = {
  children: ReactElement;
} & IconButtonProps;

export const IconButton = memo(({children, ...props}: Props) => {
  const classes = useStyles();

  return (
    <MuiIconButton classes={classes} {...props}>
      {children}
    </MuiIconButton>
  );
});

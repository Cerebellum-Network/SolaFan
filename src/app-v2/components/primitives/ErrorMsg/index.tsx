import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {Error} from '@material-ui/icons';
import clsx from 'clsx';
import {memo} from 'react';

const useStyles = makeStyles<Theme, {variant: 'warning' | 'error'}>((theme) => ({
  root: {
    position: 'relative',
  },
  rootBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    backgroundColor: ({variant}) => (variant === 'warning' ? theme.palette.warning.light : theme.palette.error.light),
    opacity: 0.2,
  },
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  icon: {
    width: '17px',
    height: '17px',
    marginRight: '10px',
    color: ({variant}) => (variant === 'warning' ? theme.palette.warning.main : theme.palette.error.main),
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    color: ({variant}) => (variant === 'warning' ? theme.palette.warning.main : theme.palette.error.main),
  },
  price: {
    color: theme.palette.text.primary,
  },
}));

type Props = {
  variant: 'warning' | 'error';
  text: string;
  price?: string;
  classes?: Partial<Record<'rootBackground', string>>;
};

export const ErrorMsg = memo(({variant, text, price, classes}: Props) => {
  const styles = useStyles({variant});

  return (
    <Box className={styles.root}>
      <Box className={clsx(styles.rootBackground, classes?.rootBackground)} />
      <Box className={styles.container}>
        <Error className={styles.icon} />
        <Typography className={styles.text}>
          {text} <span className={styles.price}>{price}</span>
        </Typography>
      </Box>
    </Box>
  );
});

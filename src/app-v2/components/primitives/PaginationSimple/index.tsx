import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';
import {memo} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  button: {
    width: '24px',
    height: '24px',
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.primary.light,
    '&:disabled': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  icon: {
    width: '15px',
  },
  rotateIcon: {
    transform: 'rotate(180deg)',
  },
  text: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    color: theme.palette.primary.light,
  },
  greyText: {
    color: theme.palette.grey[400],
  },
}));

type Props = {
  value: number;
  total: number;
  onLeftMove: () => void;
  onRightMove: () => void;
};

export const PaginationSimple = memo(({value, total, onLeftMove, onRightMove}: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <IconButton className={styles.button} onClick={onLeftMove} disabled={value <= 1}>
        <Icon className={clsx(styles.icon, styles.rotateIcon)} />
      </IconButton>
      <Typography className={styles.text}>
        <span className={value <= 1 ? styles.greyText : ''}>{value}</span>/<span>{total}</span>
      </Typography>
      <IconButton className={styles.button} onClick={onRightMove} disabled={value >= total}>
        <Icon className={styles.icon} />
      </IconButton>
    </Box>
  );
});

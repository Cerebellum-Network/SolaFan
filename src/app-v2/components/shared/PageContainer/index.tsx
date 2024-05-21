import {Container, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode} from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: 0,
    flexDirection: 'column',
    maxWidth: '430px',

    [theme.breakpoints.up('md')]: {
      // 700px
      maxWidth: '768px',
    },
    [theme.breakpoints.up('lg')]: {
      // 1280px
      maxWidth: '1280px',
      minWidth: '1280px',
    },
  },
}));

type Props = {
  children: NonNullable<ReactNode>;
  className?: string;
};

export const PageContainer = memo(({children, className}: Props) => {
  const styles = useStyles();
  return <Container className={clsx(styles.container, className)}>{children}</Container>;
});

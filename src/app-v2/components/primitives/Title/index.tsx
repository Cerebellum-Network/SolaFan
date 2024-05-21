import {cx} from '@linaria/core';
import {makeStyles, Typography} from '@material-ui/core';
import {ReactElement} from 'react';

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    fontWeight: 800,
    fontSize: '28px',
    lineHeight: '36px',
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
      lineHeight: '48px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '48px',
      lineHeight: '58px',
    },
  },
  title: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '20px',

    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '24px',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '28px',
      fontWeight: 800,
    },
  },
  subTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    color: theme.palette.grey[600],

    '& br': {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
  },
}));

type Props = {
  children?: string | ReactElement | ReactElement[];
};

export const MainTitle = ({children}: Props) => {
  const styles = useStyles();
  return <Typography className={styles.mainTitle}>{children}</Typography>;
};

export const Title = ({children}: Props) => {
  const styles = useStyles();
  return (
    <Typography variant="h1" className={styles.title}>
      {children}
    </Typography>
  );
};

export const SubTitle = ({children, clipped}: Props & {clipped?: boolean}) => {
  const styles = useStyles();
  return <Typography className={cx(styles.subTitle, clipped && 'lg:w-[620px]')}>{children}</Typography>;
};

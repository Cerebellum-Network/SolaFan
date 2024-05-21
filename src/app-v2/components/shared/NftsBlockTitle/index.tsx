import {makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '26px',
    paddingBottom: '12px',
    marginBottom: '16px',
    borderBottom: '1px solid #E0E0E7',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      fontWeight: 800,
      lineHeight: '32px',
      paddingBottom: '24px',
      marginBottom: '0',
      borderBottom: 'none',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '30px',
      lineHeight: '40px',
      marginBottom: '0',
      borderBottom: 'none',
    },
  },
  text: {
    maxWidth: '95%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  titleInfoButton: {
    color: theme.palette.info.main,
    marginLeft: '8px',
  },
}));

type Props = {
  children: string;
  onClick?: () => void;
};

export const NftsBlockTitle = memo(({children}: Props) => {
  const styles = useStyles();

  return (
    <Typography variant="h3" className={styles.title}>
      <span className={styles.text}>{children}</span>
    </Typography>
  );
});

import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {memo, ReactElement} from 'react';

const useStyles = makeStyles<Theme, {isActive?: boolean}>((theme) => ({
  linkBox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: ({isActive}) => (isActive ? 700 : 500),
  },
  text: {
    marginLeft: '16px',
  },
  marker: {
    marginLeft: '8px',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.light,
  },
}));

type Props = {
  icon: ReactElement;
  text: string;
  isActive?: boolean;
  isMarked?: boolean;
};

export const LinkIconBox = memo(({icon, text, isActive, isMarked}: Props) => {
  const styles = useStyles({isActive});

  return (
    <Typography className={styles.linkBox}>
      {icon}
      <Box className={styles.text}>{text}</Box>
      {isMarked && <Box className={styles.marker} />}
    </Typography>
  );
});

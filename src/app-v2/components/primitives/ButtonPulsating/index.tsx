import {Button} from '@cere/rxb-template-ui-kit';
import {makeStyles} from '@material-ui/core';
import {memo} from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    background: 'linear-gradient(87.67deg, #92FE9D 3.35%, #00C9FF 109.43%)',
    borderRadius: '20px',
    height: '40px',
    width: '200px',
    transform: 'scale(1)',
    animation: '$pulse 2s infinite',
    border: '1.5px solid rgba(146, 254, 157, 0.7)',
    borderWidth: '1.5px',
    borderImageSlice: '1',
    color: theme.palette.primary.main,
    display: 'block',
    '&:hover': {
      border: '1.5px solid #F8F8FA',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(146, 254, 157, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(146, 254, 157, 0)',
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(146, 254, 157, 0)',
    },
  },
}));

type Props = {
  children: string;
  onClick: () => void;
};

export const ButtonPulsating = memo(({children, onClick}: Props) => {
  const styles = useStyles();

  return (
    <Button color="primary" variant="contained" className={styles.button} onClick={onClick}>
      {children}
    </Button>
  );
});

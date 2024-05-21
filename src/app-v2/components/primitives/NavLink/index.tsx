import {makeStyles} from '@material-ui/core';
import {memo} from 'react';
import {NavLink as MuiNavLink, NavLinkProps} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    height: '100%',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: 'inherit',
    'button > *': {
      pointerEvents: 'none',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: 'none',
      borderRadius: '3px 3px 0px 0px',
    },
  },

  active: {
    fontWeight: 700,
    '&:after': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export const NavLink = memo(({children, to, ...props}: NavLinkProps) => {
  const styles = useStyles();

  return (
    <MuiNavLink to={to} {...props} className={styles.root} activeClassName={styles.active}>
      {children}
    </MuiNavLink>
  );
});

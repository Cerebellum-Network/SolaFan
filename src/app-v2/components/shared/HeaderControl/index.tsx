import {Button, makeStyles} from '@material-ui/core';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useHistory} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {useThemeBreakpoints} from '../../../hooks/useThemeBreakpoints';
import {ConnectedUserMenu} from '../../connected/ConnectedUserMenu';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '36px',
    height: '36px',
    backgroundColor: theme.palette.grey[300],
  },
  accountIconBox: {
    cursor: 'pointer',
  },
  button: {
    textTransform: 'none',
  },
  menuPaper: {
    [theme.breakpoints.down('md')]: {
      top: '0 !important',
      left: '0 !important',
      right: 0,
      maxWidth: '100vw',
      minWidth: '100vw',
      maxHeight: '100%',
      minHeight: 'unset',
    },
  },
  menuList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

type Props = {
  isUserAuth: boolean;
};

export const HeaderControl = ({isUserAuth}: Props) => {
  const {t, i18n} = useTranslation();
  const history = useHistory();
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();

  const SIGN_IN_LINK = useMemo(() => generatePath(ROUTES.SIGN_IN, {locale: i18n.language}), [i18n.language]);

  if (!isUserAuth && isDesktop) {
    return (
      <>
        <Button className={styles.button} variant="text" color="secondary" onClick={() => history.push(SIGN_IN_LINK)}>
          {t('Sign in')}
        </Button>
      </>
    );
  }

  return <ConnectedUserMenu />;
};

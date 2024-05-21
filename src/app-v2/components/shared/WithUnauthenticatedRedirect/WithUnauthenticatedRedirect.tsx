import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {FC, PropsWithChildren, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {selectUserEmail} from '../../../redux/modules/auth/selectors';

export const WithUnauthenticatedRedirect: FC<PropsWithChildren<{redirectRoute?: string}>> = ({
  redirectRoute = ROUTES.SIGN_IN,
  children,
}) => {
  const {pathname} = useLocation();
  const history = useHistory();
  const {locale} = useLocalization();
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    if (email == null) {
      history.replace(`${redirectRoute.replace(':locale', locale)}?redirectUrl=${pathname}`);
    }
  }, [email, history, locale, pathname, redirectRoute]);

  return <>{children}</>;
};

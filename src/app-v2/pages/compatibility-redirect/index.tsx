import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {generatePath, Redirect} from 'react-router-dom';

import {HIDE_EVENTS_PAGE} from '../../../config/common';
import {ROUTES} from '../../constants/routes';

export const CompatibilityRedirect = () => {
  const {locale} = useLocalization();

  return (
    <Redirect
      to={HIDE_EVENTS_PAGE ? generatePath(ROUTES.MY_PROFILE, {locale}) : generatePath(ROUTES.EVENTS, {locale})}
    />
  );
};

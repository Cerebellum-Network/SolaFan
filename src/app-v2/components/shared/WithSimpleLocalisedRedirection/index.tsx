import {ReactNode, useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {useLocaleUpdated} from '../../../../shared/hooks/use-locale-updated.hook';

export const WithSimpleLocalizedRedirection = ({children}: {children: ReactNode}) => {
  const history = useHistory();

  useLocaleUpdated(
    useCallback(
      (locale, prevLocale) => {
        const newPath = history.location.pathname.replace(`/${prevLocale}/`, `/${locale}/`);

        history.push(`${newPath}${history.location.search}`);
      },
      [history],
    ),
  );

  return <>{children}</>;
};

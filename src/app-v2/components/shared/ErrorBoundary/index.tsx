import {ErrorPage} from 'app-v2/pages/error';
import {ReactNode} from 'react';
import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary';
import {useLocation} from 'react-router-dom';

export const ErrorBoundary = ({children}: {children?: ReactNode | undefined}) => {
  const {pathname} = useLocation();

  return (
    <ReactErrorBoundary FallbackComponent={ErrorPage} key={pathname}>
      {children}
    </ReactErrorBoundary>
  );
};

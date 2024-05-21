import {ReactElement, useCallback} from 'react';

import {PageLayout} from '../../shared/PageLayout';
import {ConnectedUserMenu} from '../ConnectedUserMenu';
import {NotificationsMenuComponent} from '../Notifications/notifications-menu.component';

type AppContainerViewProps = {
  logoUrl: string;
  isUserAuthenticated: boolean;
  children: ReactElement | ReactElement[];
  creatorName?: string;
};

export const AppContainerView = ({children, logoUrl, creatorName, isUserAuthenticated}: AppContainerViewProps) => {
  const renderUserControls = useCallback(() => {
    return <ConnectedUserMenu />;
  }, []);

  const renderHeaderNotifications = useCallback(() => {
    return isUserAuthenticated ? <NotificationsMenuComponent /> : null;
  }, [isUserAuthenticated]);

  return (
    <PageLayout
      children={children}
      logoUrl={logoUrl}
      creatorName={creatorName}
      renderHeaderUserControl={renderUserControls}
      renderHeaderNotifications={renderHeaderNotifications}
      hideBackButton
    />
  );
};

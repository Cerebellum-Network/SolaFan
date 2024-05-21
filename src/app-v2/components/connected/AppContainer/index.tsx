import {connect} from 'react-redux';

import {selectAppConfig} from '../../../redux/modules/app-config/selectors';
import {selectUserEmail} from '../../../redux/modules/auth/selectors';
import {AppContainerView} from './view';

const mapStateToProps = (state: any, {creatorName}: {creatorName?: string}) => ({
  logoUrl: selectAppConfig(state).logoFull?.url,
  isUserAuthenticated: Boolean(selectUserEmail(state)),
  creatorName,
});

const mapDispatchToProps = () => ({});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainerView);

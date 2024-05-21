import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {selectAppConfig} from '../../../redux/modules/app-config/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {PlainAccessNftInfoModal} from './view';

const mapStateToProps = (state: any, {accessTokenType, title}: {accessTokenType: boolean; title: string}) => {
  const {appTitle} = selectAppConfig(state);
  return {
    appTitle,
    accessTokenType,
    title,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const AccessNftInfoModal = connect(mapStateToProps, mapDispatchToProps)(PlainAccessNftInfoModal);

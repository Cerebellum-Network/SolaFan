import {connect} from 'react-redux';

import {selectCurrentModalAndProps} from '../../../redux/modules/modals/selectors';
import {ApplicationModalContainerView} from './view';

const mapStateToProps = (state: any) => {
  const modalData = selectCurrentModalAndProps(state);
  return {
    component: modalData?.component,
    componentProps: modalData?.props,
  };
};

export const ApplicationModalContainer = connect(mapStateToProps)(ApplicationModalContainerView);

import {connect} from 'react-redux';

import {selectLoaderState} from '../../../redux/modules/loader/selectors';
import {ConnectedLoaderView} from './ConnectedLoaderView';

export const createMapStateToProps = (state: any) => {
  const loader = selectLoaderState(state);
  return {
    visible: loader.visible,
    text: loader.text,
  };
};

export const Loader = connect(createMapStateToProps)(ConnectedLoaderView);

import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {FetchCreatorsCommand} from '../../redux/modules/creators';
import {selectAllCreators, selectCreatorsLoading} from '../../redux/modules/creators/selectors';
import {CreatorsPageView} from './creators-page-view';

const mapStateToProps = (state: any) => ({
  creators: selectAllCreators(state),
  loading: selectCreatorsLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCreators: () => dispatch(FetchCreatorsCommand.create()),
});

export const CreatorsPage = connect(mapStateToProps, mapDispatchToProps)(CreatorsPageView);

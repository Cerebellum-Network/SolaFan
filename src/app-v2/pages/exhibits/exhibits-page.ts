import {ExhibitionStatus} from '@cere/services-types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {
  ExhibitsFiltersDocument,
  FetchExhibitsCommand,
  FetchExhibitsSeoCommand,
  ShowShareExhibitModalCommand,
} from '../../redux/modules/exhibits-page/actions';
import {
  selectExhibitions,
  selectExhibitionsFilter,
  selectExhibitsLoadingState,
  selectExhibitsSeo,
} from '../../redux/modules/exhibits-page/selectors';
import {ExhibitsPageView} from './exhibits-page-view';
const mapStateToProps = (state: any) => ({
  hideShowMoreButton: true,
  isLoadingExhibits: selectExhibitsLoadingState(state),
  exhibits: selectExhibitions(state),
  exhibitsFilter: selectExhibitionsFilter(state),
  exhibitsSeo: selectExhibitsSeo(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadExhibits: () => dispatch(FetchExhibitsCommand.create()),
  loadExhibitsSeo: () => dispatch(FetchExhibitsSeoCommand.create()),
  setExhibitsFilter: (filter: ExhibitionStatus) => dispatch(ExhibitsFiltersDocument.create(filter)),
  onShareClick: (exhibitId: string) => dispatch(ShowShareExhibitModalCommand.create(exhibitId)),
});

export const ExhibitsPage = connect(mapStateToProps, mapDispatchToProps)(ExhibitsPageView as any);

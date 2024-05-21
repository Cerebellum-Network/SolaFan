import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {selectAppConfig} from '../../../redux/modules/app-config/selectors';
import {selectExhibitById} from '../../../redux/modules/exhibits/selectors';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {PlainShareExhibitModal} from './view';

const mapStateToProps = (state: any, {exhibitId}: {exhibitId: string}) => {
  const exhibit = selectExhibitById(state, exhibitId)!;
  const locale = selectCurrentLocale(state);
  const appConfig = selectAppConfig(state);

  return {
    locale,
    exhibitId,
    appTitle: appConfig.appTitle,
    exhibitTitle: exhibit.title,
    exhibitDescription: exhibit.description,
    exhibitImage: exhibit.image.url,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const ShareExhibitModal = connect(mapStateToProps, mapDispatchToProps)(PlainShareExhibitModal);

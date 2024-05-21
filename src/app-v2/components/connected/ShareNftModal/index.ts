import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {selectAppConfig} from '../../../redux/modules/app-config/selectors';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {PlainShareNftModal} from './view';

const mapStateToProps = (state: any, {nftId}: {nftId: string}) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  const appConfig = selectAppConfig(state);

  return {
    locale,
    nftId,
    appTitle: appConfig.appTitle,
    nftTitle: nft?.title,
    nftDescription: nft?.description,
    nftImage: nft?.image,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const ShareNftModal = connect(mapStateToProps, mapDispatchToProps)(PlainShareNftModal);

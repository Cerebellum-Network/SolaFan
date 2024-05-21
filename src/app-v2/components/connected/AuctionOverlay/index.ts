import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {OverlayNftsCommand} from '../../../redux/modules/overlay-landscape/actions';
import {selectOverlayNfts, selectOverlayNftsLoading} from '../../../redux/modules/overlay-landscape/selectors';
import {AuctionOverlayContainer} from './view';

const mapStateToProps = (state: any) => {
  return {
    nfts: selectOverlayNfts(state),
    loading: selectOverlayNftsLoading(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  loadNfts: (slug: string) => dispatch(OverlayNftsCommand.create(slug)),
});

export const AuctionOverlay = connect(mapStateToProps, mapDispatchToProps)(AuctionOverlayContainer);

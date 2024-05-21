import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {BidSuccessModal} from '../../shared/Modals/Bid/BidSuccessModal';

type PlaceBidSuccessModalProps = {
  nftId: string;
  price: number;
};

const mapStateToProps = (state: any, {nftId, price}: PlaceBidSuccessModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  return {
    image: nft?.image,
    creatorName: nft?.creatorName,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    nftAddress: nft?.address,
    bidsCount: nft?.auction?.bids?.length ?? 0,
    userBid: price,
    transitionDetailsLink: '', // FixMe
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const PlaceBidSuccessModal = connect(mapStateToProps, mapDispatchToProps)(BidSuccessModal);

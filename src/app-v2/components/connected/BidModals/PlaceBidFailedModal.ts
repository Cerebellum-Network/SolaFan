import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {PlaceBidCommand} from '../../../redux/modules/auctions/actions';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {BidFailedModal} from '../../shared/Modals/Bid/BidFailedModal';

type PlaceBidFailedModalProps = {
  nftId: string;
  price: number;
  auctionId: string;
  sellerWalletAddress: string;
  message: string;
};

const mapStateToProps = (state: any, {nftId, price, message}: PlaceBidFailedModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);

  return {
    image: nft?.image!,
    creatorName: nft?.creatorName,
    title: nft?.title,
    subTitle: message,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    userBid: price,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  {nftId, price, auctionId, sellerWalletAddress}: PlaceBidFailedModalProps,
) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  tryAgain: () => dispatch(PlaceBidCommand.create(nftId, auctionId, sellerWalletAddress, price)),
});

export const PlaceBidFailedModal = connect(mapStateToProps, mapDispatchToProps)(BidFailedModal);

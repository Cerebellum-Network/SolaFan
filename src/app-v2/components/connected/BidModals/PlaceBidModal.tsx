import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {PlaceBidCommand} from '../../../redux/modules/auctions/actions';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {selectActiveWalletBalance, selectActiveWalletType} from '../../../redux/modules/wallets/selectors';
import {BidModal} from '../../shared/Modals/Bid/BidModal';

type PlaceBidModalProps = {
  nftId: string;
  auctionId: string;
  minBidPrice: number;
  sellerWalletAddress: string;
};

const mapStateToProps = (state: any, {nftId, minBidPrice}: PlaceBidModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  const activeWallet = selectActiveWalletType(state);

  return {
    image: nft?.image,
    creatorName: nft?.creatorName,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    walletName: activeWallet,
    walletBalance: selectActiveWalletBalance(state),
    nftAddress: nft?.address,
    bidsCount: nft?.auction?.bids?.length ?? 0,
    highestBid: nft?.auction?.bids?.[0]?.price ?? 0,
    nextMinBid: minBidPrice,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, sellerWalletAddress, auctionId}: PlaceBidModalProps) => ({
  placeBid: (bid: number) => dispatch(PlaceBidCommand.create(nftId, auctionId, sellerWalletAddress, bid)),
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  fundWallet: () => {}, // FixMe
});

export const PlaceBidModal = connect(mapStateToProps, mapDispatchToProps)(BidModal);

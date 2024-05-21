import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {ShowShareNftModalCommand} from '../../../redux/modules/nfts/actions';
import {selectNfts} from '../../../redux/modules/nfts/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../../../redux/modules/wallets/selectors';
import {ConnectedCardView} from './view';

const getCardLink = (nftId: string, locale: string) => generatePath(ROUTES.NFT_PAGE, {nftId, locale});
const getCreatorLink = (creatorId: string, locale: string) =>
  generatePath(ROUTES.CREATOR, {artistId: creatorId, locale});

const createMapStateToProps = () => {
  return (state: any, {nftId, buyBtnEvent, cardLink}: {nftId: string; buyBtnEvent?: string; cardLink?: string}) => {
    const nfts = selectNfts(state);
    const nft = Object.values(nfts).find((n) => n?.id === nftId);

    if (nft == null) {
      throw new Error(`NFT with id ${nftId} not found in store`);
    }
    const locale = selectCurrentLocale(state);

    const hasSecondaryOrders = nft?.secondaryOrders?.length > 0 || false;

    const nftBalance =
      nft.balance === 0 && hasSecondaryOrders
        ? nft.secondaryOrders.reduce((acc, order) => acc + Number(order.balance), 0)
        : nft.balance;

    const activeWalletType = selectActiveWalletType(state);
    const userWalletAddress = selectWalletAddress(state, activeWalletType)?.toLowerCase() || null;

    return {
      nftId: nft.id,
      nftOrderId: nft.orderId!,
      hasPendingTransaction: false,
      nftPurchaseStatus: nft?.purchaseStatus,
      nftAuction: nft.auction,
      nftAuctionStatus: nft.auctionStatus,
      nftAvailability: nft.availability,
      nftSellingType: nft.sellingType,
      nftType: nft.nftType,
      nftBalance: nftBalance,
      nftSupply: nft.supply,
      nftPrice: nft.priceUsd,
      minterWalletAddress: nft.minter,
      sellerWalletAddress: nft.sellerWalletAddress,
      title: nft.title,
      image: nft.image,
      auctionStatus: nft.auctionStatus,
      priceUsd: nft.priceUsd,
      cardLink: cardLink || getCardLink(nft.id, locale),
      creatorImage: '',
      creatorName: nft.creatorName,
      creatorLink: getCreatorLink(nft.creatorId, locale),
      ownedBalance: nft.ownedBalance ?? null,
      buyBtnEvent,
      userWalletAddress,
    };
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: {nftId: string}) => ({
  onShareClick: () => dispatch(ShowShareNftModalCommand.create(nftId)),
});

export const ConnectedCard = connect(createMapStateToProps, mapDispatchToProps)(ConnectedCardView);

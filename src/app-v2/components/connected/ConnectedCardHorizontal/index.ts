import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {ConnectedCardHorizontalView} from './view';

const createMapStateToProps = () => {
  return (state: any, {nftId}: {nftId: string}) => {
    const nft = selectNftById(state, nftId);
    if (nft == null) {
      throw new Error(`NFT with id ${nftId} not found in store`);
    }
    const locale = selectCurrentLocale(state);
    const cardLink = generatePath(ROUTES.NFT_PAGE, {nftId: nft.id, locale});

    return {
      nftId: nft.id,
      nftOrderId: nft.orderId!,
      hasPendingTransaction: false,
      nftPurchaseStatus: nft.purchaseStatus,
      nftAuction: nft.auction,
      nftAvailability: nft.availability,
      nftSellingType: nft.sellingType,
      nftType: nft.nftType,
      nftBalance: nft.balance,
      nftSupply: nft.supply,
      nftPrice: nft.priceUsd,
      minterWalletAddress: nft.minter,
      sellerWalletAddress: nft.sellerWalletAddress,
      title: nft.title,
      image: nft.image,
      auctionStatus: nft.auctionStatus,
      priceUsd: nft.priceUsd,
      cardLink,
    };
  };
};

export const ConnectedCardHorizontal = connect(createMapStateToProps)(ConnectedCardHorizontalView);

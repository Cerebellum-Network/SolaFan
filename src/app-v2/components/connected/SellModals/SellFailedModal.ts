import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {SellNFTCommand} from '../../../redux/modules/selling/actions';
import {SellFailedModal as PlainSellFailedModal} from '../../shared/Modals/Sell/SellFailedModal';

type SellFailedModalProps = {
  nftId: string;
  price: number;
  amount: number;
};

const mapStateToProps = (state: any, {nftId, price, amount}: SellFailedModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  return {
    image: nft?.image,
    quantity: amount,
    title: nft?.title,
    nftAddress: nft?.address,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    royalties: 0, // FixMe
    price,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId, price, amount}: SellFailedModalProps) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  onTryAgainClick: () => dispatch(SellNFTCommand.create(nftId, price, amount)),
});

export const SellFailedModal = connect(mapStateToProps, mapDispatchToProps)(PlainSellFailedModal);

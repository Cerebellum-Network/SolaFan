import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {SellSuccessModal as PlainSellSuccessModal} from '../../shared/Modals/Sell/SellSuccessModal';

type SellSuccessModalProps = {
  nftId: string;
  price: number;
  qty: number;
};

const mapStateToProps = (state: any, {nftId, price, qty}: SellSuccessModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  return {
    image: nft?.image,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
    royalties: 0, // @TODO,
    quantity: qty,
    nftAddress: nft?.address,
    priceUSDC: price,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const SellSuccessModal = connect(mapStateToProps, mapDispatchToProps)(PlainSellSuccessModal);

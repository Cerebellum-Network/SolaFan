import {BigNumberish} from 'ethers';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {SellNFTCommand} from '../../../redux/modules/selling/actions';
import {UpdatedSellModal} from '../../shared/Modals/Sell/UpdatedSellModal';

type SellModalProps = {
  nftId: string;
};

const mapStateToProps = (state: any, {nftId}: SellModalProps) => {
  const nft = selectNftById(state, nftId);
  return {
    quantity: 1, // FIXME
    nft,
    price: nft?.priceUsd,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: SellModalProps) => {
  return {
    sell: (price: BigNumberish, amount: number) => dispatch(SellNFTCommand.create(nftId, price, amount)),
    onClose: () => dispatch(CloseActiveModalCommand.create()),
  };
};

export const SellModal = connect(mapStateToProps, mapDispatchToProps)(UpdatedSellModal);

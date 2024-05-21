import {selectNftById} from 'app-v2/redux/modules/nfts/selectors';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ShowShareNftModalCommand} from '../../redux/modules/nfts/actions';
import {NftCard} from '../shared/NftCard/nft-card';

const createMapStateToProps = () => {
  return (state: any, {nftId}: {nftId: string}) => {
    const nft = selectNftById(state, nftId);
    if (nft == null) {
      throw new Error(`NFT with id ${nftId} not found in store`);
    }
    return {nft};
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: {nftId: string}) => ({
  onShareClick: () => dispatch(ShowShareNftModalCommand.create(nftId)),
});

export const ConnectedNftCard = connect(createMapStateToProps(), mapDispatchToProps)(NftCard);

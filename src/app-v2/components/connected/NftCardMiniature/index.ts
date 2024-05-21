import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {LoadNftByIdCommand} from '../../../redux/modules/nfts/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {withSearchQuery} from '../../../utils/withSearchQuery';
import {NftCardMiniatureView} from './view';

const mapStateToProps = (state: any, {nftId}: any) => {
  const nft = selectNftById(state, nftId);
  return {
    nftTitle: nft?.title || '',
    nftImageUrl: nft?.image || '',
    creatorName: nft?.creatorName || '',
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: any) => ({
  loadNftData: () => {
    if (!nftId) {
      return;
    }
    dispatch(LoadNftByIdCommand.create(nftId));
  },
});

export const NftCardMiniature = withSearchQuery(['nftId', 'price', 'orderId', 'auctionId'])(
  connect(mapStateToProps, mapDispatchToProps)(NftCardMiniatureView),
);

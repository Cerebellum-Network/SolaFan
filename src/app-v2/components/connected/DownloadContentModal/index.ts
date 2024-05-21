import {connect} from 'react-redux';

import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {DownloadContentModal as Modal} from './view';

const mapStateToProps = (state: any, {nftId}: {nftId: string}) => {
  const nft = selectNftById(state, nftId);

  return {
    nft,
  };
};

export const DownloadContentModal = connect(mapStateToProps)(Modal);

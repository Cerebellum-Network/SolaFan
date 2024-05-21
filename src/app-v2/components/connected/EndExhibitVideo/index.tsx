import {ExhibitCardInterface} from '@cere/services-types/dist/types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ShowPurchaseNftFromVideoModal} from '../../../redux/modules/exhbit-page';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {EndExhibitVideoDialog} from '../../shared/EndExhibitVideoDialog';

interface IEndExhibitVideo {
  open: boolean;
  onClose: () => void;
  morePopularExhibits: ExhibitCardInterface[] | null;
  handleOpenPurchaseNFTs: () => void;
  onShareExhibit: (exhibitId: string) => void;
  onPlayAgain: () => void;
  slug: string;
}

const mapStateToProps = (
  _: unknown,
  {morePopularExhibits, handleOpenPurchaseNFTs, onShareExhibit, onPlayAgain, slug}: IEndExhibitVideo,
) => {
  return {
    morePopularExhibits,
    handleOpenPurchaseNFTs,
    onShareExhibit,
    onPlayAgain,
    slug,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  handleOpenPurchaseNFTs: (slug: string) => dispatch(ShowPurchaseNftFromVideoModal.create(slug)),
});

export const EndExhibitVideo = connect(mapStateToProps, mapDispatchToProps)(EndExhibitVideoDialog);

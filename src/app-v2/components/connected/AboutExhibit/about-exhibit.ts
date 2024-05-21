import {FullCreatorInterface, NftCardInterface} from '@cere/services-types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ShowPurchaseNftFromVideoModal} from '../../../redux/modules/exhbit-page';
import {selectEvent} from '../../../redux/modules/exhbit-page/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {AboutExhibitDialog} from '../../shared/AboutExhibitDialog/about-exhibit-dialog';

interface IAboutExhibit {
  open: boolean;
  onClose: () => void;
  title: string;
  creator: FullCreatorInterface | undefined;
  creatorAvatar: string;
  description: string;
  exclusiveNfts: NftCardInterface[] | null;
  slug: string;
}

const mapStateToProps = (state: any, {exclusiveNfts, slug}: IAboutExhibit) => {
  const event = selectEvent(state);
  return {
    title: event?.title,
    creator: event?.creator,
    description: event?.description,
    exclusiveNfts,
    slug,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
  handleOpenPurchaseNFTs: (slug: string) => dispatch(ShowPurchaseNftFromVideoModal.create(slug)),
});

export const AboutExhibit = connect(mapStateToProps, mapDispatchToProps)(AboutExhibitDialog);

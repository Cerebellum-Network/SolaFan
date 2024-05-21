import {CheckUserHasNftEnum, ExhibitCardInterface, NftCardInterface} from '@cere/services-types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {parseMediaAlternativeText} from '../../../shared/lib/media';
import {AddToCalendarCommand} from '../../redux/modules/add-to-calendar/actions';
import {
  FetchEventCommand,
  FetchMoreExhibitsCommand,
  ShowAboutExhibitModal,
  ShowAccessNftInfoModalCommand,
  ShowEndExhibitVideoModal,
  ShowPurchaseNftFromVideoModal,
  ShowShareExhibitModalCommand,
  ShowShareNftModalCommand,
} from '../../redux/modules/exhbit-page';
import {
  createSelectExhibitNfts,
  selectEvent,
  selectEventLoading,
  selectMoreExhibits,
} from '../../redux/modules/exhbit-page/selectors';
import {LoadNftsArrayByIdsCommand} from '../../redux/modules/nfts/actions';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {EventTimelineStatus} from '../../types/exhibit';
import {getEventTimelineStatus} from '../../utils/helpers/exibit';
import {sortNftsByPurchaseStatus} from './helpers';
import {ExhibitPageView} from './view';

const mapStateToProps = (state: any) => {
  const selectExhibitNfts = createSelectExhibitNfts();

  const event = selectEvent(state) || undefined;
  const nftIds = event?.nfts?.map(({id}) => id);
  const eventNfts = selectExhibitNfts(state, nftIds)?.sort(sortNftsByPurchaseStatus) || [];
  const isEventLoading = selectEventLoading(state);
  const timelineStatus = event == null ? undefined : getEventTimelineStatus(event.startsAt, event.endsAt);
  const {ddcUrl} = parseMediaAlternativeText(
    (event?.assets?.length && event.assets[0]?.content?.alternativeText) || '',
  );
  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
  const url = event?.assets?.[0]?.content?.url;
  const accessTicket = eventNfts;

  const isEventLocked = !eventNfts.every(({purchaseStatus}) => purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT);
  return {
    event: event,
    creator: event?.creator,
    isEventLoading,
    bannerImage:
      timelineStatus === EventTimelineStatus.STARTED ? event?.live_theme?.background?.url : event?.image?.url,
    userData: state.auth,
    isUserHaveEventAccess: event?.allowFreeAccess || walletPublicKey != null,
    teaserPosterImage:
      accessTicket.length === 0
        ? event?.teaser?.poster?.url
        : event?.allowFreeAccess
        ? event?.videoPreview.url
        : accessTicket.length === 0
        ? event?.liveTeaser?.poster?.url
        : event?.videoPreview.url,
    eventNftsCount: eventNfts.length || 0,
    teaserVideoSrc: event?.liveTeaser?.content.url,
    videoSrc: ddcUrl || url,
    nfts: eventNfts,
    morePopularExhibits: event == null ? [] : selectMoreExhibits(state, [event.id]),
    isEventLocked,
    userWalletAddress: walletPublicKey || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const shareExhibit = (exhibitId: string) => dispatch(ShowShareExhibitModalCommand.create(exhibitId));
  return {
    loadEvent: (isPreviewMode: boolean, slug: string) => dispatch(FetchEventCommand.create(isPreviewMode, slug)),
    loadMoreExhibits: (creatorId: string) => dispatch(FetchMoreExhibitsCommand.create(creatorId)),
    shareNftModal: (nftId: string) => dispatch(ShowShareNftModalCommand.create(nftId)),
    showNftInfo: (accessTokenType: boolean, title: string) =>
      dispatch(ShowAccessNftInfoModalCommand.create(accessTokenType, title)),
    addToCalendar: (startsAt: string, endsAt: string, title: string, description: string, id: string) =>
      dispatch(AddToCalendarCommand.create(startsAt, endsAt, title, description, id)),
    aboutExhibit: (exclusiveNfts: NftCardInterface[] | null, slug: string) =>
      dispatch(ShowAboutExhibitModal.create(exclusiveNfts, slug)),
    openEndExhibitVideo: (morePopularExhibits: ExhibitCardInterface[], onPlayAgain: () => void, slug: string) =>
      dispatch(ShowEndExhibitVideoModal.create(morePopularExhibits, shareExhibit, onPlayAgain, slug)),
    shareExhibit: shareExhibit,
    openPurchaseNft: (slug: string) => dispatch(ShowPurchaseNftFromVideoModal.create(slug)),
    loadAllNfts: () => dispatch(LoadNftsArrayByIdsCommand.create([])),
  };
};

export const ExhibitPage = connect(mapStateToProps, mapDispatchToProps)(ExhibitPageView);

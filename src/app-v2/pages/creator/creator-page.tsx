import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Dispatch} from 'redux';

import {selectUserEmail} from '../../redux/modules/auth/selectors';
import {LoadCreatorPageDataCommand} from '../../redux/modules/creator-page';
import {
  selectCreatorDetailsPageLoadingState,
  selectCreatorExhibitsSlugs,
  selectCreators,
} from '../../redux/modules/creator-page/selectors';
import {FetchCreatorsCommand} from '../../redux/modules/creators';
import {selectCreatorById} from '../../redux/modules/creators/selectors';
import {ShowShareExhibitModalCommand} from '../../redux/modules/exhbit-page';
import {LoadExhibitsArrayByIdsCommand} from '../../redux/modules/exhibits/actions';
import {selectExhibitsByCreatorId} from '../../redux/modules/exhibits/selectors';
import {LoadNftsArrayByIdsCommand} from '../../redux/modules/nfts/actions';
import {selectNftByIds} from '../../redux/modules/nfts/selectors';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {CreatorPageView} from './creator-page-view';

const mapStateToProps = (state: any, {creatorId}: any) => {
  const loadingState = selectCreatorDetailsPageLoadingState(state);
  const creator = selectCreatorById(state, creatorId);
  const exhibitsSlugs = selectCreatorExhibitsSlugs(state);
  const exhibits = selectExhibitsByCreatorId(state, creatorId);
  const eventsNftIds = Array.from(new Set(exhibits.flatMap((event) => event.nfts.map(({id}) => id))));
  const nfts = selectNftByIds(state, eventsNftIds);
  const creators = selectCreators(state);
  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();
  const userEmail = selectUserEmail(state);

  return {
    isLoadingCreator: loadingState.isCreatorLoading,
    isLoadingExhibits: loadingState.isLoadingCreatorExhibits,
    isLoadingNfts: loadingState.isLoadingCreatorNfts,
    isLoadingCreators: loadingState.isLoadingCreators,
    creator,
    exhibitsSlugs,
    exhibits,
    eventsNftIds,
    nfts,
    creators,
    userEmail,
    userWalletAddress: walletPublicKey || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {creatorId}: any) => ({
  loadCreators: () => dispatch(FetchCreatorsCommand.create()),
  loadNfts: (nftIds: string[]) => dispatch(LoadNftsArrayByIdsCommand.create(nftIds)),
  loadEvents: (slugs: string[]) => dispatch(LoadExhibitsArrayByIdsCommand.create(slugs)),
  loadData: () => dispatch(LoadCreatorPageDataCommand.create(creatorId)),
  onShareClick: (exhibitId: string) => dispatch(ShowShareExhibitModalCommand.create(exhibitId)),
});

export const CreatorPageWrapper = connect(mapStateToProps, mapDispatchToProps)(CreatorPageView);

export const CreatorPage = () => {
  const {artistId} = useParams<{artistId: string}>();
  return <CreatorPageWrapper creatorId={artistId} />;
};

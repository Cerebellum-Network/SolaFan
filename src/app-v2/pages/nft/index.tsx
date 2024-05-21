import {ChainId, Deployment, getContractAddress} from '@cere/freeport-sc-sdk';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Dispatch} from 'redux';

import {APPLICATION, ENV, NETWORK_ID} from '../../../config/common';
import {maticNetworkUrls, MaticTestnetIdEnum} from '../../../shared/services/web3';
import {selectUserEmail} from '../../redux/modules/auth/selectors';
import {selectCreatorById} from '../../redux/modules/creators/selectors';
import {ShowShareNftModalCommand} from '../../redux/modules/exhbit-page';
import {LoadExhibitsArrayByIdsCommand} from '../../redux/modules/exhibits/actions';
import {selectExhibitsBySlugs} from '../../redux/modules/exhibits/selectors';
import {
  LoadNftPageDataCommand,
  LoadNftTransfersCommand,
  ShowDownloadContentModal,
  UpdateNftDataCommand,
} from '../../redux/modules/nft-page/actions';
import {
  selectNftDetailsPageLoadingState,
  selectNftOrders,
  selectNftTransfers,
} from '../../redux/modules/nft-page/selectors';
import {LoadNftsArrayByIdsCommand} from '../../redux/modules/nfts/actions';
import {selectNftById, selectNfts} from '../../redux/modules/nfts/selectors';
import {ShowCancelNFTSellingModalCommand, ShowSellNFTModalCommand} from '../../redux/modules/selling/actions';
import {selectActiveWalletType, selectWalletAddress} from '../../redux/modules/wallets/selectors';
import {NftPageView} from './view';

const mapStateToProps = (state: any, {nftId}: any) => {
  const loadingState = selectNftDetailsPageLoadingState(state);
  const nft = selectNftById(state, nftId);
  const userEmail = selectUserEmail(state);
  const unlockingEventsSlugs = nft?.unlockingEventsSlugs || [];
  const relatedEvents =
    loadingState.isNftLoading || unlockingEventsSlugs == null ? [] : selectExhibitsBySlugs(state, unlockingEventsSlugs);
  const eventsNftIds = Array.from(new Set(relatedEvents.flatMap((event) => event.nfts.map(({id}) => id))));

  const activeWalletType = selectActiveWalletType(state);
  const walletPublicKey = selectWalletAddress(state, activeWalletType)?.toLowerCase();

  const nftTransfers = selectNftTransfers(state);

  const networkUrl = maticNetworkUrls[NETWORK_ID as MaticTestnetIdEnum];
  const contractAddress = getContractAddress({
    deployment: (ENV || 'dev') as Deployment,
    contractName: 'Marketplace',
    chainId: NETWORK_ID as ChainId,
    application: APPLICATION(),
  });

  return {
    isLoadingNft: loadingState.isNftLoading,
    hasPendingTransaction: false,
    nftPurchaseStatus: nft?.purchaseStatus,
    nft,
    creator: nft == null ? undefined : selectCreatorById(state, nft.creatorId),
    isLoadingNftsListing: loadingState.isLoadingNftsListing,
    nftsListing: selectNftOrders(state),
    isLoadingNftsCollectibles: false,
    nftsCollectables: Object.values(selectNfts(state)).filter((nft) => nft != null) as Exclude<
      ReturnType<typeof selectNfts>[string],
      undefined
    >[],
    userWalletAddress: walletPublicKey || null,
    activeWalletType,
    externalWalets: [],
    unlockingEventsSlugs,
    relatedEvents,
    eventsNftIds,
    userEmail,
    nftTransfers,
    transitionDetailsLink: `${networkUrl}address/${contractAddress}`,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, {nftId}: any) => ({
  loadData: () => dispatch(LoadNftPageDataCommand.create(nftId)),
  loadTransfersData: (collectionAddress: string, id: string) =>
    dispatch(LoadNftTransfersCommand.create(id, collectionAddress)),
  updateNftData: () => dispatch(UpdateNftDataCommand.create(nftId)),
  loadRelatingEvents: (slugs: string[]) => dispatch(LoadExhibitsArrayByIdsCommand.create(slugs)),
  shareNftModal: (nftId: string) => dispatch(ShowShareNftModalCommand.create(nftId)),
  downloadNftContent: (nftId: string) => {
    dispatch(ShowDownloadContentModal.create(nftId));
  },
  loadNfts: (nftIds: string[]) => dispatch(LoadNftsArrayByIdsCommand.create(nftIds)),
  showSellNftModal: () => dispatch(ShowSellNFTModalCommand.create(nftId)),
  showCancelOrderModal: (qty: number, orderId: string) =>
    dispatch(ShowCancelNFTSellingModalCommand.create(nftId, qty, orderId)),
});

export const NftPageWrapper = connect(mapStateToProps, mapDispatchToProps)(NftPageView);

export const NftPage = () => {
  const {nftId} = useParams<{nftId: string}>();
  return <NftPageWrapper nftId={nftId} />;
};

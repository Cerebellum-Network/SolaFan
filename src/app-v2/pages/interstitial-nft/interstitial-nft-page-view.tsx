import {
  CheckUserHasNftEnum,
  FullCreatorInterface,
  NftCardInterface,
  NftType,
  WalletInterface,
} from '@cere/services-types';
import {Box, Theme, Typography, useMediaQuery} from '@material-ui/core';
import {PageContainer} from 'app-v2/components/shared/PageContainer';
import {useCallback, useEffect, useMemo} from 'react';
import {Provider} from 'react-redux';

import {GoogleAnalyticsId} from '../../../analytics-ids';
import {NftCardCompositeButton} from '../../components/connected/ActionButton/NftCardCompositeButton';
import {AppContainer} from '../../components/connected/AppContainer';
import {SubscribeButtons} from '../../components/connected/SubscribeButtons/SubscribeButtons';
import {CollapseBox} from '../../components/primitives/CollapseBox';
import {Title} from '../../components/primitives/Title';
import {Badge} from '../../components/shared/Badge';
import {BidHistory} from '../../components/shared/BidHistory';
import {
  AccordionSkeleton,
  CardsHorizontalListSkeleton,
  NftDetailPageInfoSkeleton,
} from '../../components/shared/Skeletons';
import {useLocalization} from '../../hooks/use-locale.hook';
import {toolkitStore} from '../../redux/toolkit/store';
import {CmsExhibit} from '../../types/exhibit';
import {UsersNftCardInterface} from '../../types/nft';
import {Order} from '../../types/order';
import {SubscriptionTypeEnum} from '../../types/subscription';
import {NftTransfer} from '../../types/transfer';
import {getBidHistoryStatus} from '../../utils/helpers/auction';
import {TransactionHistory} from '../nft/components/TransactionHistory';
import {Details} from './components/Details';
import {MoreCollectibles} from './components/MoreCollectibles';
import {NftInfo} from './components/NftInfo/nft-info';
import {useStyles} from './styles';

type NftPageViewProps = {
  isLoadingNft: boolean;
  hasPendingTransaction: boolean;
  nft?: UsersNftCardInterface;
  nftTransfers: NftTransfer[] | undefined;
  creator?: FullCreatorInterface;
  unlockingEventsSlugs: string[];
  nftsListing: Order[];
  isLoadingNftsCollectibles: boolean;
  relatedEvents: CmsExhibit[];
  nftsCollectables: NftCardInterface[];
  userWalletAddress: string | null;
  externalWallets: WalletInterface[];
  loadData: () => void;
  updateNftData: () => void;
  loadRelatingEvents: (slugs: string[]) => void;
  shareNftModal: (nftId: string) => void;
  downloadNftContent: (nftId: string) => void;
  nftPurchaseStatus?: CheckUserHasNftEnum;
  loadNfts: (ids: string[]) => void;
  eventsNftIds: string[];
  userEmail: string;
  isLoadingNftsListing: boolean;
  transitionDetailsLink: string;
  showCancelOrderModal: (qty: number, orderId: string) => void;
  showSellNftModal: () => void;
  loadTransfersData: (collectionAddress: string, id: string) => void;
};

export const InterstitialNftPageView = ({
  isLoadingNft,
  hasPendingTransaction,
  nft,
  nftTransfers,
  transitionDetailsLink,
  creator,
  isLoadingNftsListing,
  nftsListing,
  unlockingEventsSlugs,
  isLoadingNftsCollectibles,
  nftsCollectables,
  relatedEvents,
  userWalletAddress,
  externalWallets,
  loadData,
  updateNftData,
  shareNftModal,
  downloadNftContent,
  nftPurchaseStatus,
  loadRelatingEvents,
  eventsNftIds,
  loadNfts,
  userEmail,
  showCancelOrderModal,
  showSellNftModal,
  loadTransfersData,
}: NftPageViewProps) => {
  const {t} = useLocalization();
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const styles = useStyles();

  useEffect(() => {
    if (userEmail) {
      if (userWalletAddress) {
        loadData();
      }
    } else {
      loadData();
    }
  }, [loadData, userEmail, userWalletAddress]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && !isLoadingNft && userWalletAddress) {
      loadRelatingEvents(unlockingEventsSlugs);
      loadNfts(eventsNftIds);
      if (nft?.collectionAddress && nft?.address) {
        loadTransfersData(nft.collectionAddress, nft.address);
      }
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingNft, userWalletAddress]);

  useEffect(() => {
    if (hasPendingTransaction) {
      const interval = setInterval(updateNftData, 10 * 1000);
      const timeout = setTimeout(() => clearInterval(interval), 30 * 1000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransaction]);

  const bids = useMemo(() => getBidHistoryStatus(nft?.id, nft?.auction?.bids), [nft?.id, nft?.auction?.bids]);

  const actionElements = useMemo(
    () =>
      nft != null && nftPurchaseStatus !== CheckUserHasNftEnum.USER_HAS_NFT ? (
        <NftCardCompositeButton
          userWalletAddress={userWalletAddress}
          buttonSize={'small'}
          nftId={nft.id}
          nftOrderId={nft.orderId!}
          nftPurchaseStatus={nftPurchaseStatus}
          nftSellingType={nft.sellingType}
          nftType={nft.nftType}
          nftQuantity={1}
          disabled={hasPendingTransaction && nft.purchaseStatus !== CheckUserHasNftEnum.USER_HAS_NFT}
          buttonText={`Buy For $${nft.priceUsd}`}
          buyBtnEvent={GoogleAnalyticsId.CollectibleBuyBtn}
        />
      ) : (
        <Box className="flex items-center">
          <Badge classes={{badgeText: '!text-sm !font-normal', badgeBox: 'align-center'}} text={t('Collected')} />
          <Box className="leading-7 text-[28px] font-extrabold ml-[40px]">${nft?.priceUsd || ''}</Box>
        </Box>
      ),
    [hasPendingTransaction, nft, nftPurchaseStatus, t, userWalletAddress],
  );

  const handleOnShareNft = useCallback(
    (nftId: string) => {
      shareNftModal(nftId);
    },
    [shareNftModal],
  );

  const handleOnDownloadNft = useCallback(
    (nftId: string) => {
      downloadNftContent(nftId);
    },
    [downloadNftContent],
  );

  return (
    <AppContainer creatorName={creator?.name}>
      <PageContainer>
        <Box className={styles.sectionsWrapper}>
          <Typography variant={isMobile ? 'h3' : 'h1'} className={styles.nftTitle}>
            {nft?.title}
          </Typography>
          <Box className={styles.section}>
            {isLoadingNft || creator == null || nft == null ? (
              <NftDetailPageInfoSkeleton />
            ) : (
              <NftInfo
                showCancelOrderModal={showCancelOrderModal}
                showSellNftModal={showSellNftModal}
                isLoadingNftsListing={isLoadingNftsListing}
                nftsListing={nftsListing}
                isProcessing={hasPendingTransaction}
                nft={nft}
                creator={creator}
                actionElements={actionElements}
                onShareClick={handleOnShareNft}
                onDownloadClick={handleOnDownloadNft}
                relatedEvents={relatedEvents}
                userWalletAddress={userWalletAddress}
              />
            )}
          </Box>

          {bids.length > 0 && (
            <Box className={styles.section}>
              {isLoadingNft || nft == null ? (
                <AccordionSkeleton title={<Typography className={styles.title}>{t('Bid history')}</Typography>} />
              ) : (
                !nft.isComingSoon &&
                nft.nftType === NftType.AUCTIONED && (
                  <CollapseBox
                    summary={<Typography className={styles.title}>{t('Bid history')}</Typography>}
                    classes={{details: styles.acordionDetails}}
                  >
                    <BidHistory bids={bids} userWalletAddress={userWalletAddress} externalWallets={externalWallets} />
                  </CollapseBox>
                )
              )}
            </Box>
          )}

          <Box className={styles.section}>
            {isLoadingNft || nft == null ? (
              <AccordionSkeleton title={<Typography className={styles.title}>{t('Bid history')}</Typography>} />
            ) : (
              !nft.isComingSoon && (
                <CollapseBox
                  summary={<Typography className={styles.title}>{t('Details')}</Typography>}
                  disabled={isLoadingNft}
                  classes={{details: styles.acordionDetails}}
                >
                  <Details nft={nft} />
                </CollapseBox>
              )
            )}
          </Box>

          {nftTransfers && nftTransfers?.length > 0 && (
            <Box className={styles.section}>
              {isLoadingNft || nft == null ? (
                <AccordionSkeleton title={<Typography className={styles.title}>{t('Bid history')}</Typography>} />
              ) : (
                <CollapseBox
                  summary={<Typography className={styles.title}>{t('Transaction history')}</Typography>}
                  disabled={isLoadingNft}
                  classes={{details: styles.acordionDetails}}
                >
                  <TransactionHistory
                    nft={nft}
                    transfers={nftTransfers}
                    transitionDetailsLink={transitionDetailsLink}
                  />
                </CollapseBox>
              )}
            </Box>
          )}
        </Box>

        <Box className={styles.collectiblesBox}>
          <Box className={styles.collectiblesTitle}>
            <Title>{t('More collectibles from {{artist}}', {artist: creator?.name})}</Title>
          </Box>
          {isLoadingNftsCollectibles ? (
            <CardsHorizontalListSkeleton />
          ) : (
            <MoreCollectibles nftList={nftsCollectables} userWalletAddress={userWalletAddress} />
          )}
          {creator?.id && (
            <Box pt={3} display="flex" justifyContent="center">
              <Provider store={toolkitStore}>
                <SubscribeButtons
                  userEmail={userEmail}
                  type={SubscriptionTypeEnum.ARTIST}
                  entityId={creator.id}
                  buttonSize="medium"
                  hideUnsubscribeButton={true}
                  provideEmailMessage={t(
                    `Provide your email to get the latest news, future drops and updates from {{artist}}`,
                    {artist: creator.name},
                  )}
                  provideEmailAgreementMessage={t(
                    'I agree to receive important announcements, feature updates and offers from the {{artis}}',
                    {artist: creator.name},
                  )}
                  confirmSubscriptionMessage={t('You have subscribed for the latest updates from the {{artist}}', {
                    artist: creator.name,
                  })}
                  confirmUnsubscriptionMessage={t('You have unsubscribed for the latest updates from {{artist}}', {
                    artist: creator.name,
                  })}
                />
              </Provider>
            </Box>
          )}
        </Box>
      </PageContainer>
    </AppContainer>
  );
};

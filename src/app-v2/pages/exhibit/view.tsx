import {FullCreatorInterface, NftCardInterface} from '@cere/services-types';
import {Box, Typography} from '@material-ui/core';
import {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {AppContainer} from '../../components/connected/AppContainer';
import {DaysDifference} from '../../components/shared/DaysDifference';
import {EventTopSection} from '../../components/shared/EventTopSection/event-top-section';
import {NftsEventBlock} from '../../components/shared/NftsEventBlock';
import {ExhibitBannerSkeleton, ExhibitsRowSkeleton, NftTicketsSkeleton} from '../../components/shared/Skeletons';
import {useLocalization} from '../../hooks/use-locale.hook';
import {ExhibitPageRouteParams, useIsPreviewMode} from '../../hooks/useIsPreviewMode';
import type {UserData} from '../../models/auth/types';
import {CmsExhibit, EventTimelineStatus} from '../../types/exhibit';
import {UsersNftCardInterface} from '../../types/nft';
import {getEventTimelineStatus} from '../../utils/helpers/exibit';
import {EXHIBIT_NFTS_ELEMENT_ID} from '../interstitial-exhibit/interstitial-exhibit-page-view';
import {MorePopularExhibitsList} from './components/MorePopularExhibitsList';

type Props = {
  userData?: UserData;
  bannerImage?: string;
  teaserPosterImage?: string;
  teaserVideoSrc?: string;
  videoSrc: string | undefined;
  isUserHaveEventAccess?: boolean;
  accessTicket?: NftCardInterface[] | null;
  event?: CmsExhibit;
  creator?: FullCreatorInterface;
  nfts: UsersNftCardInterface[];
  morePopularExhibits: CmsExhibit[] | null;
  loadEvent: (isPreviewMode: boolean, slug: string) => void;
  loadMoreExhibits: (creatorId: string) => void;
  shareNftModal: (nftId: string) => void;
  shareExhibit: (exhibitId: string) => void;
  showNftInfo: (accessTokenType: boolean, title: string) => void;
  addToCalendar: (startsAt: string, endsAt: string, title: string, description: string, id: string) => void;
  aboutExhibit: (exclusiveNfts: NftCardInterface[] | null, slug: string) => void;
  openEndExhibitVideo: (morePopularExhibits: any, onPlayAgain: any, slug: string) => void;
  openPurchaseNft: (
    slug: string,
    openAuctionOverlay: (value: ((prevState: boolean) => boolean) | boolean) => void,
  ) => void;
  isEventLoading: boolean;
  isEventLocked: boolean;
  loadAllNfts: () => void;
  userWalletAddress: string | null;
  eventNftsCount: number;
};

export const ExhibitPageView = memo(
  ({
    bannerImage,
    teaserPosterImage,
    teaserVideoSrc,
    nfts,
    event,
    creator,
    morePopularExhibits,
    loadEvent,
    loadMoreExhibits,
    shareNftModal,
    shareExhibit,
    isEventLoading,
    showNftInfo,
    isEventLocked,
    loadAllNfts,
    userWalletAddress,
    eventNftsCount,
  }: Props) => {
    const isPreviewMode = useIsPreviewMode();
    const {exhibitSlug} = useParams<ExhibitPageRouteParams>();
    const {t} = useLocalization();
    const eventTimelineStatus = useMemo(() => getEventTimelineStatus(event?.startsAt, event?.endsAt), [event]);

    const nftTitles = useMemo(
      () => ({
        TICKETS: 'Own to unlock',
        EXCLUSIVE: t('Exclusive NFTs'),
      }),
      [t],
    );

    const nftsEventBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      loadEvent(isPreviewMode, exhibitSlug);
    }, [creator?.id, exhibitSlug, isPreviewMode, loadEvent, loadMoreExhibits]);

    useEffect(() => {
      loadAllNfts();
    }, [loadAllNfts]);

    useEffect(() => {
      if (creator?.id) {
        loadMoreExhibits(creator?.id!);
      }
    }, [creator?.id, loadMoreExhibits]);

    const onShareExhibit = useCallback(
      (eventId: string) => {
        shareExhibit(eventId);
      },
      [shareExhibit],
    );

    const onShareNft = useCallback(
      (nftId: string) => {
        shareNftModal(nftId);
      },
      [shareNftModal],
    );

    const onTicketsTitleClick = useCallback(() => {
      showNftInfo(true, nftTitles.TICKETS);
    }, [nftTitles.TICKETS, showNftInfo]);

    const onLikeNft = useCallback((nftId: string) => {
      console.log(nftId, 'click like');
    }, []);

    const badgeBlock = useMemo(() => {
      if (eventTimelineStatus !== EventTimelineStatus.NOT_STARTED) {
        return null;
      }

      return event?.startsAt == null ? null : <DaysDifference endDate={event.startsAt} />;
    }, [event?.startsAt, eventTimelineStatus]);

    return (
      <AppContainer creatorName={creator?.name}>
        <Box className="flex place-content-center min-w-80">
          <Box className="sm:bg-white sm:mt-6 rounded-[12px] max-w-[1000px] w-full">
            {!event || nfts.length === 0 || isEventLoading ? (
              <ExhibitBannerSkeleton />
            ) : (
              <EventTopSection
                creator={creator!}
                isEventLocked={isEventLocked}
                badge={badgeBlock!}
                nfts={nfts}
                playerAsset={teaserVideoSrc || null}
                event={event}
                bannerImage={bannerImage}
                teaserPosterImage={teaserPosterImage}
                eventTimelineStatus={eventTimelineStatus}
                userWalletAddress={userWalletAddress}
                eventNftsCount={eventNftsCount}
                nftsEventBlockRef={nftsEventBlockRef}
              />
            )}

            <Box className="px-4 sm:px-0">
              <Box className="bg-white">
                <Box id={EXHIBIT_NFTS_ELEMENT_ID} display="flex" flexDirection="column" className="pt-6 px-3">
                  {(nfts == null || nfts.length > 0) && (
                    <>
                      <Typography onClick={onTicketsTitleClick} className="py-3" variant="h3">
                        {nftTitles.TICKETS}
                      </Typography>
                      {!nfts ? (
                        <NftTicketsSkeleton />
                      ) : (
                        <NftsEventBlock
                          nftsEventBlockRef={nftsEventBlockRef}
                          nfts={nfts}
                          onShareNft={onShareNft}
                          onLikeNft={onLikeNft}
                        />
                      )}
                    </>
                  )}

                  {(morePopularExhibits == null || morePopularExhibits.length > 0) && (
                    <Box>
                      <Typography variant="h3" className="py-3">
                        {t('Other events of {{creator}}', {creator: creator?.name})}
                      </Typography>

                      {morePopularExhibits == null ? (
                        <ExhibitsRowSkeleton />
                      ) : (
                        <MorePopularExhibitsList
                          exhibits={morePopularExhibits}
                          onShareExhibit={onShareExhibit}
                          variant="desktop"
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppContainer>
    );
  },
);

import {FullCreatorInterface, NftCardInterface} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, makeStyles, Typography} from '@material-ui/core';
import dayjs from 'dayjs';
import {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {Provider} from 'react-redux';
import {useParams} from 'react-router-dom';

import {ReactComponent as LockClosedIcon} from '../../assets/svg/lock-closed.svg';
import {AppContainer} from '../../components/connected/AppContainer';
import {SubscribeButtons} from '../../components/connected/SubscribeButtons/SubscribeButtons';
import {AvatarWithName} from '../../components/primitives/AvatarWithName/avatar-with-name';
import {Skeleton} from '../../components/primitives/Skeleton';
import {ContentSlider} from '../../components/shared/ContentSlider/content-slider';
import {DaysDifference} from '../../components/shared/DaysDifference';
import {NftsEventBlock} from '../../components/shared/NftsEventBlock';
import {ExhibitBannerSkeleton, NftTicketsSkeleton} from '../../components/shared/Skeletons';
import {useLocalization} from '../../hooks/use-locale.hook';
import {ExhibitPageRouteParams, useIsPreviewMode} from '../../hooks/useIsPreviewMode';
import type {UserData} from '../../models/auth/types';
import {toolkitStore} from '../../redux/toolkit/store';
import {CmsExhibit, EventTimelineStatus, EventTypeEnum, EventTypeName, SliderTypeEnum} from '../../types/exhibit';
import {UsersNftCardInterface} from '../../types/nft';
import {SubscriptionTypeEnum} from '../../types/subscription';
import {getEventTimelineStatus} from '../../utils/helpers/exibit';
import {EventTopSection} from './components/EventTopSection/event-top-section';

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
  userEmail: string;
};

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: '12px',
    },
  },
  redText: {
    color: 'rgba(255, 79, 89, 1)',
  },
  eventInfo: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
    },
  },
  eventInfoGrayText: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.0075em',
    color: '#6E6E79',
  },
}));

export const EXHIBIT_NFTS_ELEMENT_ID = 'exhibit-nfts';

export const InterstitialExhibitPageView = memo(
  ({
    bannerImage,
    teaserPosterImage,
    teaserVideoSrc,
    nfts,
    event,
    creator,
    loadEvent,
    loadMoreExhibits,
    shareNftModal,
    isEventLoading,
    showNftInfo,
    isEventLocked,
    loadAllNfts,
    userWalletAddress,
    eventNftsCount,
    userEmail,
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
    }, [exhibitSlug, isPreviewMode, loadEvent]);

    useEffect(() => {
      loadAllNfts();
    }, [loadAllNfts]);

    useEffect(() => {
      if (creator?.id) {
        loadMoreExhibits(creator?.id!);
      }
    }, [creator?.id, loadMoreExhibits]);

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

    // @TODO uncomment after the first launch
    // const availableSeatsCount = useMemo(
    //   () => (event == null ? undefined : event.attendees - event.approvedAttendees),
    //   [event],
    // );

    const styles = useStyles();

    return (
      <AppContainer creatorName={creator?.name}>
        <Box className="flex place-content-center min-w-80">
          <Box className="max-w-[1000px] w-full">
            {event == null ? (
              <Skeleton className="mx-4" variant="text" height={58} />
            ) : (
              <Box className={`sm:flex pt-4 hidden flex-row w-full`}>
                {isEventLocked && <LockClosedIcon className="h-[28px] w-[28px]" />}
                <Typography variant="h3">{event?.title}</Typography>
              </Box>
            )}
            <Box className="sm:bg-white sm:mt-6 rounded-[12px] max-w-[1000px] w-full overflow-hidden">
              {!event || nfts.length === 0 || isEventLoading ? (
                <ExhibitBannerSkeleton />
              ) : (
                <EventTopSection
                  isEventLocked={isEventLocked}
                  badge={badgeBlock!}
                  nfts={nfts}
                  event={event}
                  bannerImage={bannerImage}
                  eventTimelineStatus={eventTimelineStatus}
                  userWalletAddress={userWalletAddress}
                  eventNftsCount={eventNftsCount}
                  nftsEventBlockRef={nftsEventBlockRef}
                  creator={creator}
                />
              )}

              {teaserVideoSrc == null && teaserPosterImage == null ? null : (
                <Box className="px-4 pb-3 sm:px-0">
                  <Box className="p-4 bg-white rounded-b-md">
                    <ContentSlider
                      userWalletAddress={userWalletAddress}
                      slides={[
                        {
                          preview: null,
                          background: null,
                          playerAsset: teaserVideoSrc ?? null,
                          playerPreviewUrl: teaserPosterImage ?? null,
                          contentType: SliderTypeEnum.VIDEO,
                          hasAccess: true,
                          name: null,
                        },
                      ]}
                      slidePreviewType="internal"
                    />
                  </Box>
                </Box>
              )}

              {!isEventLoading && (
                <Box className="px-4 pb-3 sm:px-0">
                  <Box className="bg-white rounded-md">
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

                      <Box className={cx(styles.eventInfo)} py={3}>
                        <Box className={styles.row}>
                          <Typography variant="subtitle2">Created By</Typography>
                          {creator && (
                            <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                              <AvatarWithName creator={creator} isVerified />
                            </Typography>
                          )}
                        </Box>
                        <Box className={styles.row}>
                          <Typography variant="subtitle2">Event type</Typography>
                          {event && (
                            <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                              {EventTypeName[event.eventType as EventTypeEnum]}
                            </Typography>
                          )}
                        </Box>
                        <Box className={styles.row}>
                          <Typography variant="subtitle2">Location</Typography>
                          {event && (
                            <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                              {event.eventPublicLocation},{' '}
                              {!event.eventHiddenLocation ? '[hidden location]' : event?.eventHiddenLocation}
                            </Typography>
                          )}
                        </Box>
                        {/* @TODO uncomment after the first launch */}
                        {/*<Box className={styles.row}>*/}
                        {/*  <Typography variant="subtitle2">Attendees</Typography>*/}
                        {/*  {event && (*/}
                        {/*    <Typography*/}
                        {/*      variant="subtitle2"*/}
                        {/*      className={cx(styles.eventInfoGrayText, 'flex items-center')}*/}
                        {/*    >*/}
                        {/*      <span*/}
                        {/*        className={cx(isEventLocked ? '' : 'mr-1')}*/}
                        {/*      >{`${event?.approvedAttendees} / ${event?.attendees}`}</span>{' '}*/}
                        {/*      {!isEventLocked ? (*/}
                        {/*        <Badge text="Attending" />*/}
                        {/*      ) : (*/}
                        {/*        <>*/}
                        {/*          {event && event.approvedAttendees / event.attendees > 0.9 && (*/}
                        {/*            <span className={cx(styles.redText, 'ml-1')}>*/}
                        {/*              {' '}*/}
                        {/*              {`${availableSeatsCount} seats left!`}*/}
                        {/*            </span>*/}
                        {/*          )}*/}
                        {/*        </>*/}
                        {/*      )}*/}
                        {/*    </Typography>*/}
                        {/*  )}*/}
                        {/*</Box>*/}
                        <Box className={styles.row}>
                          <Typography variant="subtitle2">Date & Time</Typography>
                          <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                            {dayjs(event?.endsAt).format('MMM D, YYYY, HH:mm')}{' '}
                            {eventTimelineStatus === EventTimelineStatus.FINISHED && (
                              <span className={styles.redText}>ENDED</span>
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

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
        </Box>
      </AppContainer>
    );
  },
);

InterstitialExhibitPageView.displayName = 'InterstitialExhibitPageView';

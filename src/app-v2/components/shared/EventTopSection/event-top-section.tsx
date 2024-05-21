import {CheckUserHasNftEnum, FullCreatorInterface} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, Divider, Theme, Typography, useMediaQuery} from '@material-ui/core';
import dayjs from 'dayjs';
import {ReactNode, Ref, useCallback, useMemo, useState} from 'react';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {REACT_APP_SHOW_COLLECTION_PROGRESS} from '../../../../config/common';
import {ReactComponent as LockClosedIcon} from '../../../assets/svg/lock-closed.svg';
import {EventActionButton} from '../../../pages/exhibit/components/EventActionButton';
import {EventContentAsset, SliderContent} from '../../../types/common';
import {CmsExhibit, EventTimelineStatus, EventTypeEnum, EventTypeName, SliderTypeEnum} from '../../../types/exhibit';
import {UsersNftCardInterface} from '../../../types/nft';
import {ConnectedEventUnlockProgress} from '../../connected/EventUnlockProgress';
import {AvatarWithName} from '../../primitives/AvatarWithName/avatar-with-name';
import {TextWithShowMore} from '../../primitives/TextWithShowMore';
import {Badge} from '../Badge';
import {ContentSlider} from '../ContentSlider/content-slider';
import {EventBanner} from '../EventBanner/EventBanner';
import {useStyles} from './styles';

export type Props = {
  creator: FullCreatorInterface;
  isEventLocked: boolean;
  badge: NonNullable<ReactNode>;
  nfts: UsersNftCardInterface[];
  event: CmsExhibit;
  eventNftsCount: number;
  nftsEventBlockRef: Ref<HTMLDivElement> | null;
  bannerImage?: string;
  teaserPosterImage?: string;
  playerAsset: string | null;
  eventTimelineStatus: EventTimelineStatus;
  userWalletAddress: string | null;
};
export const EventTopSection = ({
  creator,
  isEventLocked,
  badge,
  event,
  nfts,
  bannerImage,
  playerAsset,
  teaserPosterImage,
  eventTimelineStatus,
  userWalletAddress,
  eventNftsCount,
  nftsEventBlockRef,
}: Props) => {
  const [sliderView, setSliderView] = useState<'preview' | 'full'>('full');
  const isMobile = useMediaQuery<Theme>((theme) => `${theme.breakpoints.down('md')}`);

  const {
    endsAt,
    title,
    description,
    eventType,
    eventPublicLocation,
    attendees,
    approvedAttendees,
    eventHiddenLocation,
    streamUrl,
  } = event;
  const styles = useStyles({bannerImage});

  const eventContent: EventContentAsset[] = useMemo(() => {
    const eventPreview =
      isMobile && eventTimelineStatus !== EventTimelineStatus.FINISHED
        ? []
        : [
            {
              preview: event?.image?.url ?? null,
              previewFormats: event?.image?.formats,
              background: event?.live_theme?.background?.url ?? null,
              playerAsset: null,
              playerPreviewUrl: null,
              contentType: SliderTypeEnum.IMAGE,
              hasAccess: true,
              name: title,
            },
          ];
    return [
      ...eventPreview,
      {
        preview: null,
        previewFormats: event?.image?.formats,
        background: null,
        playerAsset: playerAsset ?? null,
        playerPreviewUrl: teaserPosterImage ?? null,
        contentType: SliderTypeEnum.VIDEO,
        hasAccess: true,
        name: null,
      },
    ];
  }, [
    event?.image?.formats,
    event?.image?.url,
    event?.live_theme?.background?.url,
    eventTimelineStatus,
    isMobile,
    playerAsset,
    teaserPosterImage,
    title,
  ]);

  const slides: SliderContent[] = useMemo(() => {
    return nfts.reduce((prev, {assets, purchaseStatus, address: nftId, collectionAddress}) => {
      const arr =
        assets.map((asset, index) => ({
          asset,
          hasAccess: purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT || false,
          nftId,
          collectionAddress,
          currentIndex: index,
          name: asset.name,
        })) || [];
      return sliderView === 'full' ? [...prev, ...arr] : prev;
    }, [] as SliderContent[]);
  }, [nfts, sliderView]);

  const availableSeatsCount = useMemo(() => attendees - approvedAttendees, [approvedAttendees, attendees]);

  const handleChangeEventView = useCallback((view: 'preview' | 'full') => {
    setSliderView(view);
  }, []);

  const renderSlider = useCallback(
    (slidePreviewType: 'external' | 'internal') => {
      return (
        <ContentSlider
          userWalletAddress={userWalletAddress}
          slides={[...eventContent, ...slides]}
          slidePreviewType={slidePreviewType}
        />
      );
    },
    [eventContent, slides, userWalletAddress],
  );

  return (
    <div className="overflow-hidden max-w-screen-md w-full flex flex-wrap sm:bg-white p-0 rounded-[12px]">
      <div className="w-full sm:w-1/2 relative m-0 p-0">
        {badge}
        {!isMobile && renderSlider('external')}
      </div>
      <div className="w-full sm:w-1/2 m-0 p-0">
        <Box className={styles.playerBox}>
          <Box className={cx(styles.displayOnMobile, 'px-4 sm:px-0')}>
            <Box className={`flex p-3 flex-row w-full`}>
              {isEventLocked && <LockClosedIcon className="h-[24px] pt-1" />}
              <Typography variant="h3">{title}</Typography>
            </Box>
            <EventBanner event={event} />
          </Box>
          <Box className={`sm:flex pl-5 pt-4 hidden flex-row w-full`}>
            {isEventLocked && <LockClosedIcon className="h-[20px] self-center" />}
            <Typography variant="h3">{title}</Typography>
          </Box>
          <Box className="px-4 py-0 sm:px-0 w-full">
            <Box className="flex flex-col justify-items-stretch w-full bg-white py-4 sm:pt-2">
              <Box className="w-full sm:px-3">
                {REACT_APP_SHOW_COLLECTION_PROGRESS && (
                  <Box className="w-full hidden sm:flex border-2 border-gray-200 p-4 rounded-[12px] bg-white">
                    <ConnectedEventUnlockProgress eventSlug={event.slug} />
                  </Box>
                )}
              </Box>
              <Box className={cx('px-3 sm:pt-3', GoogleAnalyticsId.UnlockExperienceBtn)}>
                <EventActionButton
                  startsAt={event.startsAt!}
                  isEventLocked={isEventLocked}
                  eventType={eventType}
                  eventHiddenLocation={eventHiddenLocation}
                  streamUrl={streamUrl}
                  eventTimelineStatus={eventTimelineStatus}
                  sliderView={sliderView}
                  eventNftsCount={eventNftsCount}
                  onChangeView={handleChangeEventView}
                  nftsEventBlockRef={nftsEventBlockRef}
                />
                {isMobile && renderSlider('external')}
              </Box>
              <Box className={cx(styles.eventInfo, 'px-3')}>
                <Box className={styles.row}>
                  <Typography variant="subtitle2">Created By</Typography>
                  <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                    <AvatarWithName creator={creator} isVerified />
                  </Typography>
                </Box>
                <Box className={styles.row}>
                  <Typography variant="subtitle2">Event type</Typography>
                  <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                    {EventTypeName[eventType as EventTypeEnum]}
                  </Typography>
                </Box>
                <Box className={styles.row}>
                  <Typography variant="subtitle2">Location</Typography>
                  <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                    {eventPublicLocation}, {!eventHiddenLocation ? '[hidden location]' : eventHiddenLocation}
                  </Typography>
                </Box>
                <Box className={styles.row}>
                  <Typography variant="subtitle2">Attendees</Typography>
                  <Typography variant="subtitle2" className={cx(styles.eventInfoGrayText, 'flex items-center')}>
                    <span
                      className={cx(isEventLocked ? '' : 'mr-1')}
                    >{`${event.approvedAttendees} / ${event.attendees}`}</span>{' '}
                    {!isEventLocked ? (
                      <Badge text="Attending" />
                    ) : (
                      <>
                        {event.approvedAttendees / event.attendees > 0.9 && (
                          <span className={cx(styles.redText, 'ml-1')}> {`${availableSeatsCount} seats left!`}</span>
                        )}
                      </>
                    )}
                  </Typography>
                </Box>
                <Box className={styles.row}>
                  <Typography variant="subtitle2">Date & Time</Typography>
                  <Typography variant="subtitle2" className={styles.eventInfoGrayText}>
                    {dayjs(endsAt).format('MMM D, YYYY, HH:mm')}{' '}
                    {eventTimelineStatus === EventTimelineStatus.FINISHED && (
                      <span className={styles.redText}>ENDED</span>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="p-3">
                <Divider className="w-full" />
              </Box>
              <Box className="p-3">
                <TextWithShowMore>{description}</TextWithShowMore>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

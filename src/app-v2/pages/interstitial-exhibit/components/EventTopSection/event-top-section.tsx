import {CheckUserHasNftEnum, FullCreatorInterface} from '@cere/services-types';
import {cx} from '@linaria/core';
import {Box, Theme, Typography, useMediaQuery} from '@material-ui/core';
import dayjs from 'dayjs';
import {ReactNode, Ref, useCallback, useEffect, useRef, useState} from 'react';

import {REACT_APP_SHOW_COLLECTION_PROGRESS} from '../../../../../config/common';
import {ReactComponent as CalendarCheckIcon} from '../../../../assets/svg/calendar-check.svg';
import {ReactComponent as LockClosedIcon} from '../../../../assets/svg/lock-closed.svg';
import {ConnectedEventUnlockProgress} from '../../../../components/connected/EventUnlockProgress';
import {QrCodeTicketGenerateButton} from '../../../../components/connected/QRCodeTicketGenerateButton/QrCodeTicketGenerateButtons';
import {TextWithShowMore} from '../../../../components/primitives/TextWithShowMore';
import {AddToCalendarButton} from '../../../../components/shared/AddToCalendarButton/add-to-calendar-button';
import {ContentSlider} from '../../../../components/shared/ContentSlider/content-slider';
import {EventBanner} from '../../../../components/shared/EventBanner/EventBanner';
import {CmsExhibit, EventTimelineStatus, EventTypeEnum, SliderTypeEnum} from '../../../../types/exhibit';
import {UsersNftCardInterface} from '../../../../types/nft';
import {EventActionButton} from '../EventActionButton';
import {useStyles} from './styles';

export type Props = {
  isEventLocked: boolean;
  badge: NonNullable<ReactNode>;
  event: CmsExhibit;
  eventNftsCount: number;
  nftsEventBlockRef: Ref<HTMLDivElement> | null;
  bannerImage?: string;
  eventTimelineStatus: EventTimelineStatus;
  userWalletAddress: string | null;
  creator?: FullCreatorInterface;
  nfts: UsersNftCardInterface[];
};
export const EventTopSection = ({
  isEventLocked,
  badge,
  event,
  bannerImage,
  eventTimelineStatus,
  userWalletAddress,
  eventNftsCount,
  nftsEventBlockRef,
  nfts,
}: Props) => {
  console.log('Event top section event >>>', event);
  const [sliderView, setSliderView] = useState<'preview' | 'full'>('full');
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const isMobile = useMediaQuery<Theme>((theme) => `${theme.breakpoints.down('md')}`);
  const userNfts = nfts.filter((nft) => nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT);
  const userEventNft = userNfts.find((nft) => nft.exhibitionId === event.id);

  const {title, description, eventType, eventHiddenLocation, streamUrl} = event;
  const styles = useStyles({bannerImage});

  const handleChangeEventView = useCallback((view: 'preview' | 'full') => {
    setSliderView(view);
  }, []);

  useEffect(() => {
    if (leftColumnRef.current) {
      const imgElement = leftColumnRef.current.querySelector('img');
      if (imgElement) {
        imageRef.current = imgElement;
      }
    }
  }, []);

  const getHeight = (
    element: HTMLElement,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    withMargins = false,
  ) => {
    const {height} = element.getBoundingClientRect();
    if (withMargins) {
      const computedStyle = window.getComputedStyle(element);
      const marginTop = parseFloat(computedStyle.marginTop || '0');
      const marginBottom = parseFloat(computedStyle.marginBottom || '0');
      const totalHeight = height + marginTop + marginBottom;
      setHeight(totalHeight);
    } else {
      setHeight(height);
    }
  };

  const recalculateHeights = useCallback(() => {
    if (imageRef.current) {
      getHeight(imageRef.current, setImageHeight);
    }
    if (buttonRef.current) {
      getHeight(buttonRef.current, setButtonHeight, true);
    }
  }, [imageRef, buttonRef]);

  useEffect(() => {
    const handleResize = () => {
      recalculateHeights();
    };
    window.addEventListener('resize', handleResize);
    recalculateHeights();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [recalculateHeights]);

  const handleLoadImage = () => {
    recalculateHeights();
  };

  return (
    <>
      <div className="overflow-hidden w-full flex flex-wrap sm:bg-white p-0 rounded-tl-[12px]">
        <div className="w-full sm:w-1/2 relative m-0 p-0" ref={leftColumnRef}>
          {badge}
          {!isMobile && (
            <ContentSlider
              userWalletAddress={userWalletAddress}
              slides={[
                {
                  preview: event?.image?.url ?? null,
                  previewFormats: event.image.formats,
                  background: null,
                  playerAsset: null,
                  playerPreviewUrl: null,
                  contentType: SliderTypeEnum.IMAGE,
                  hasAccess: true,
                  name: title,
                },
              ]}
              slidePreviewType="internal"
              onLoadImage={handleLoadImage}
            />
          )}
        </div>
        <div className="w-full sm:w-1/2 m-0 p-0">
          <Box className={styles.playerBox}>
            <Box className={cx(styles.displayOnMobile, 'px-4 sm:px-0')}>
              <Box className="flex p-3 flex-row w-full">
                {isEventLocked && <LockClosedIcon className="h-[28px] w-[28px]" />}
                <Typography variant="h3">{title}</Typography>
              </Box>
              <EventBanner event={event} />
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
                {event?.id && userWalletAddress && (
                  <Box className="p-3 flex flex-col">
                    <QrCodeTicketGenerateButton
                      userWalletAddress={userWalletAddress}
                      userNfts={userNfts}
                      event={event}
                    ></QrCodeTicketGenerateButton>
                  </Box>
                )}
                <Box className="p-3">
                  <TextWithShowMore
                    maxHeight={imageHeight - buttonHeight}
                    rowsCount={5}
                    classes={{text: styles.eventDescription}}
                  >
                    {description}
                  </TextWithShowMore>
                </Box>
                {eventTimelineStatus !== EventTimelineStatus.FINISHED && (
                  <Box className="flex flex-row items-start gap-1 py-2 px-3">
                    <CalendarCheckIcon className="fill-gray-400 w-4 h-4" />
                    <Typography variant="body2">{dayjs(event.startsAt).format('MM/DD/YYYY')}</Typography>
                    <AddToCalendarButton event={event} />
                  </Box>
                )}

                {(!userEventNft || event.eventType !== EventTypeEnum.IN_PERSON) && (
                  <div className="px-3 sm:pt-3" ref={buttonRef}>
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
                  </div>
                )}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

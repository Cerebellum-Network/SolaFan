import {NftType} from '@cere/services-types';
import {CheckUserHasNftEnum} from '@cere/services-types';
import {cx} from '@linaria/core';
import {styled} from '@linaria/react';
import dayjs from 'dayjs';
import {useMemo} from 'react';
import {Trans} from 'react-i18next';
import {Link} from 'react-router-dom';

import {REACT_APP_SHOW_COLLECTION_PROGRESS} from '../../../../config/common';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {CmsExhibit} from '../../../types/exhibit';
import {UsersNftCardInterface} from '../../../types/nft';
import {eventTypeLocalized} from '../../../utils/helpers/event-type';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';
import chest from './chest.svg';
import chestUnlocked from './chest-unlocked.svg';
import dateIcon from './date-icon.svg';
import eventIcon from './event-icon.svg';
import {EventStage} from './event-stage';
import personIcon from './person-icon.svg';

const Chest = styled.div`
  --border: 2px;
  width: 60px;
  box-sizing: border-box;
  border: solid 2px rgb(253, 184, 54, 0.8);
  background: rgba(252, 217, 150, 0.2);
`;

type Props = {
  nfts: UsersNftCardInterface[];
  className?: string;
  event: Pick<
    CmsExhibit,
    | 'eventType'
    | 'endsAt'
    | 'startsAt'
    | 'eventHiddenLocation'
    | 'eventPublicLocation'
    | 'slug'
    | 'image'
    | 'title'
    | 'approvedAttendees'
    | 'attendees'
  >;
  analyticEventId?: string;
};

export function EventCard({event, nfts, className, analyticEventId}: Props) {
  const {t, locale} = useLocalization();
  const displayedEventType = useMemo((): string => {
    return eventTypeLocalized(event.eventType, t);
  }, [event.eventType, t]);

  const accessNfts = useMemo(() => {
    const tickets = nfts.filter(Boolean).filter((nft) => nft.nftType === NftType.ACCESS);
    const purchased = tickets.filter((nft) => nft.purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT);
    const notPurchases = tickets.filter((nft) => nft.purchaseStatus !== CheckUserHasNftEnum.USER_HAS_NFT);
    return [...purchased, ...notPurchases];
  }, [nfts]);

  const collectedNfts = useMemo(() => accessNfts.filter((nft) => nft.purchaseStatus === 'USER_HAS_NFT'), [accessNfts]);

  const isUnlockedEvent = collectedNfts.length === accessNfts.length;

  const eventStatus = useMemo((): string => {
    const now = dayjs();
    const endDate = dayjs(event.endsAt);
    const startDate = dayjs(event.startsAt);
    if (now.isBefore(startDate)) {
      return t('Not started');
    }
    if (now.isAfter(startDate) && now.isBefore(endDate)) {
      if (event.eventType === 'in_person') {
        return event.eventHiddenLocation == null
          ? `${event.eventPublicLocation} [${t('hidden location')}]`
          : `${event.eventPublicLocation} ${event.eventHiddenLocation}`;
      }
      return t('Online');
    }
    return t('Event ended');
  }, [event.endsAt, event.eventHiddenLocation, event.eventPublicLocation, event.eventType, event.startsAt, t]);

  const isEventEnded = dayjs().isAfter(dayjs(event.endsAt));
  const eventEndTime = isEventEnded
    ? dayjs(event.endsAt).format('MMM, YYYY')
    : dayjs(event.endsAt).format('MMM, YYYY, HH:mm');

  const chestIconText = useMemo((): string => {
    if (isUnlockedEvent) {
      return 'Unlocked';
    }
    return isEventEnded ? 'Event ended' : 'Unlock events';
  }, [isEventEnded, isUnlockedEvent]);

  return (
    <Link className={cx('block', analyticEventId)} to={`/${locale}/home/event/${event.slug}`}>
      <div className={cx('grid', 'grid-rows-[1fr_96px]', 'bg-black', 'lg:w-[270px]', 'aspect-[320/420]', className)}>
        <div className="relative">
          <ResponsiveImage
            alt=""
            className="absolute left-0 right-0 object-cover w-full h-full"
            size={270}
            formats={event.image.formats}
            fallbackUrl={event.image.url}
          />
          <div className="absolute w-full py-6 bg-gradient-to-b from-gray-800 to-transparent text-white text-center">
            <h3 className="font-bold text-xl px-2">{event.title}</h3>
            <p>{eventStatus}</p>
          </div>
          <div
            className={cx(
              'border-[1px] border-black absolute left-0 w-full h-[60px] bg-[rgba(0,0,0,0.7)] text-white grid grid-cols-3 text-[10px] backdrop-blur-sm',
              REACT_APP_SHOW_COLLECTION_PROGRESS ? 'bottom-0' : '-bottom-[75px]',
            )}
          >
            <div className="outline-1 gap-[1px] outline outline-black flex gap-y-1 flex-col items-center justify-center">
              <h4 className="flex items-baseline justify-center text-[8px] gap-x-1 uppercase">
                <img alt="" src={eventIcon} />
                {t('Event type')}
              </h4>
              <p className="font-bold">{displayedEventType}</p>
            </div>
            <div className="outline-1 outline outline-black flex gap-y-1 flex-col items-center justify-around">
              <h4 className="flex items-center justify-center text-[8px] gap-x-1 uppercase">
                <img alt="" src={personIcon} />
                {t('Attendees')}
              </h4>
              {/* @TODO uncomment after the first launch */}
              <p className="font-bold">{/*  {event.approvedAttendees}/{event.attendees}*/}</p>
            </div>
            <div className="outline-1 outline outline-black flex gap-y-[1px] flex-col items-center justify-center">
              <h4 className="flex items-center justify-center text-[8px] gap-x-1 uppercase">
                <img alt="" src={dateIcon} />
                Date
              </h4>
              <p className="font-bold">{eventEndTime}</p>
              {isEventEnded && (
                <span className="uppercase bg-gray-500 p-[1px] rounded-sm text-[8px]">{t('Ended')}</span>
              )}
            </div>
          </div>
        </div>
        {REACT_APP_SHOW_COLLECTION_PROGRESS && (
          <div className="text-white text-[9px] p-4 grid grid-cols-[1fr_60px] grid-rows-[max-content_1fr_max-content]">
            <span className="text-[10px]">
              {accessNfts.length === 1 ? (
                <Trans i18nKey="Collect this and you can attend" />
              ) : (
                <Trans i18nKey="Collect all {{length}}, and you can attend" values={{length: accessNfts.length}} />
              )}
            </span>
            <div className="row-span-3 grid grid-rows-1">
              <Chest className="relative rounded-lg flex flex-col gap-y-1 items-center justify-center">
                <p
                  className={cx(
                    'font-bold',
                    'text-center',
                    isUnlockedEvent ? 'text-[#fdb836]' : 'text-white',
                    'text-[8px]',
                    'uppercase',
                    'leading-[10px]',
                  )}
                >
                  {chestIconText}
                </p>
                {isUnlockedEvent ? <img alt="" src={chestUnlocked} /> : <img alt="" src={chest} />}
              </Chest>
            </div>
            <div className="flex items-center gap-x-[1px] overflow-hidden">
              {accessNfts.map((nft) => (
                <EventStage
                  key={nft.id}
                  status={nft.purchaseStatus || CheckUserHasNftEnum.USER_DOES_NOT_HAVE_NFT}
                  nft={nft}
                />
              ))}
            </div>
            <span>
              <span className="text-gray-300">{t('Collected:')}</span>
              <span className="ml-1 font-bold inline-flex gap-x-1">
                <span className="text-pink-500">{collectedNfts.length}</span>
                <span>/</span>
                <span>{accessNfts.length}</span>
              </span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

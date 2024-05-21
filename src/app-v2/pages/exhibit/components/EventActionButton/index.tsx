import {Button, ButtonGroup, makeStyles, Theme} from '@material-ui/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import {Ref, useCallback, useEffect, useState} from 'react';

import {EventTimelineStatus, EventTypeEnum} from '../../../../types/exhibit';
import {EXHIBIT_NFTS_ELEMENT_ID} from '../../../interstitial-exhibit/interstitial-exhibit-page-view';

export const useStyles = makeStyles<Theme, {finished: boolean}>(() => ({
  actionButton: {
    width: '100%',
    marginBottom: ({finished}) => (finished ? '0' : '16px'),
  },
  notFilledButton: {
    width: '100%',
  },
  buttonGroup: {
    width: '100%',
    borderBottom: '1px solid #E0E0E7',
    marginBottom: '16px',
  },
}));

type TimerProps = {
  targetDate: dayjs.Dayjs;
};

const Timer: React.FC<TimerProps> = ({targetDate}) => {
  const [timeRemaining, setTimeRemaining] = useState(targetDate.diff(dayjs(), 'second'));

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsRemaining = targetDate.diff(dayjs(), 'second');
      setTimeRemaining(secondsRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (seconds: number) => {
    const duration = dayjs.duration(seconds, 'seconds');

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return <>{formatTime(timeRemaining)}</>;
};

type Props = {
  isEventLocked: boolean;
  eventType: EventTypeEnum;
  eventTimelineStatus: EventTimelineStatus;
  sliderView: 'preview' | 'full';
  onChangeView: (view: 'preview' | 'full') => void;
  startsAt: string;
  eventNftsCount: number;
  nftsEventBlockRef: Ref<HTMLDivElement> | null;
  eventHiddenLocation?: string;
  streamUrl?: string;
};

export const EventActionButton = ({
  eventType,
  isEventLocked,
  eventTimelineStatus,
  eventHiddenLocation,
  streamUrl,
  sliderView,
  onChangeView,
  startsAt,
  eventNftsCount,
  nftsEventBlockRef,
}: Props) => {
  const styles = useStyles({finished: eventTimelineStatus === EventTimelineStatus.FINISHED});

  const isContentDrop = eventType === EventTypeEnum.CONTENT_DROP;
  const isLiveStream = eventType === EventTypeEnum.LIVE_STREAM;
  const isLocked = isEventLocked && !isLiveStream;

  const buttonText =
    isContentDrop || isLocked
      ? `Own all ${eventNftsCount} collectibles to see the location`
      : isLiveStream
      ? eventTimelineStatus === EventTimelineStatus.NOT_STARTED
        ? 'Join Live in'
        : !isLocked
        ? `Own all ${eventNftsCount} collectibles to join Live`
        : 'Join Live'
      : 'Open Map';

  const isButtonDisabled = isEventLocked || isContentDrop;

  const handleButtonClick = useCallback(() => {
    if (isButtonDisabled) {
      if (nftsEventBlockRef && 'current' in nftsEventBlockRef && nftsEventBlockRef.current) {
        nftsEventBlockRef.current.scrollIntoView({behavior: 'smooth'});
      }
      return;
    }
    const urlToOpen =
      streamUrl != null
        ? streamUrl
        : eventHiddenLocation != null && eventType !== EventTypeEnum.LIVE_STREAM
        ? `https://www.google.com/maps/place/${eventHiddenLocation}`
        : undefined;

    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    } else {
      console.warn('No location or stream url provided');
      const exhibitNftsElement = document.getElementById(EXHIBIT_NFTS_ELEMENT_ID);
      if (exhibitNftsElement) {
        exhibitNftsElement.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [eventHiddenLocation, isButtonDisabled, nftsEventBlockRef, streamUrl, eventType]);

  const handleOnChange = (view: 'preview' | 'full') => {
    onChangeView(view);
  };

  const showTimer = eventTimelineStatus === EventTimelineStatus.NOT_STARTED && isLiveStream;

  return (
    <>
      {!isContentDrop && eventTimelineStatus !== EventTimelineStatus.FINISHED && (
        <Button
          variant="contained"
          color="default"
          className={clsx(`${isLocked ? styles.disabledButton : ''} ${styles.actionButton}`)}
          onClick={handleButtonClick}
        >
          {buttonText} {showTimer && <Timer targetDate={dayjs(startsAt)} />}
        </Button>
      )}
      {eventTimelineStatus === EventTimelineStatus.FINISHED && !isEventLocked && (
        <ButtonGroup className={styles.buttonGroup}>
          <Button
            variant={sliderView === 'full' ? 'outlined' : 'contained'}
            color="default"
            className={`${sliderView === 'preview' ? styles.actionButton : styles.notFilledButton}`}
            onClick={() => handleOnChange('preview')}
          >
            Event Preview
          </Button>
          <Button
            variant={sliderView === 'preview' ? 'outlined' : 'contained'}
            color="default"
            className={`${sliderView === 'full' ? styles.actionButton : styles.notFilledButton}`}
            onClick={() => handleOnChange('full')}
          >
            Full Content
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

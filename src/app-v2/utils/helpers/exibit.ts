import {EventTimelineStatus} from '../../types/exhibit';

export const getEventTimelineStatus = (startsAt?: string, endsAt?: string, isComingSoon?: boolean) => {
  if (!startsAt || isComingSoon) {
    return EventTimelineStatus.NOT_STARTED;
  }

  const currentDate = new Date();

  if (currentDate < new Date(startsAt)) {
    return EventTimelineStatus.NOT_STARTED;
  }

  if (endsAt && currentDate > new Date(endsAt)) {
    return EventTimelineStatus.FINISHED;
  }

  return EventTimelineStatus.STARTED;
};

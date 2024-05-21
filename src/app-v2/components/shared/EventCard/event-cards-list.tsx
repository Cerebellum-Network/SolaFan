import {ExhibitCardInterface} from '@cere/services-types';

import {EventTimelineStatus} from '../../../../shared/types/event';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {ConnectedEventCard} from '../../connected/ConnectedEventCard';
import {Condition, ConditionsList, Defaults} from '../Conditions';

type Exhibit = ExhibitCardInterface & {
  nfts: {id: string}[];
};
type Props = {
  events: Exhibit[];
  isSorted?: boolean;
};

const EXHIBITS_SORT_ORDER = [
  EventTimelineStatus.STARTED,
  EventTimelineStatus.NOT_STARTED,
  EventTimelineStatus.FINISHED,
];

const getTimelineStatus = (exhibition?: {
  startsAt?: string;
  endsAt?: string;
  isComingSoon?: boolean;
}): EventTimelineStatus => {
  if (!exhibition) {
    return EventTimelineStatus.NOT_STARTED;
  }

  const eventStartDate = new Date(exhibition.startsAt ?? Date.now());
  const eventEndDate = new Date(exhibition.endsAt ?? Date.now());
  const currentDate = new Date();

  if (currentDate < eventStartDate) return EventTimelineStatus.NOT_STARTED;
  if (!exhibition.startsAt) return EventTimelineStatus.NOT_STARTED;
  else if (currentDate > eventEndDate) return EventTimelineStatus.FINISHED;
  else return EventTimelineStatus.STARTED;
};

const sortAllEvents = (events: Exhibit[]): Exhibit[] => {
  return events
    .map((event) => ({
      ...event,
      status: getTimelineStatus(event),
    }))
    .sort((a, b) => EXHIBITS_SORT_ORDER.indexOf(a.status) - EXHIBITS_SORT_ORDER.indexOf(b.status));
};

export function EventCardsList({events, isSorted = false}: Props) {
  const {t} = useLocalization();

  const sortedEvents = isSorted ? sortAllEvents(events) : events;

  return (
    <div className="mb-6">
      <ConditionsList>
        <Condition condition={events.length > 0}>
          <div className="flex overflow-auto w-[calc(100vw-2rem)] no-scrollbar gap-x-2 md:gap-x-4 lg:overflow-[unset] lg:w-[unset] lg:grid lg:gap-8 lg:grid-cols-3">
            {sortedEvents.map(({slug, id}) => (
              <ConnectedEventCard
                key={`${id}_${slug}`}
                slug={slug}
                className="w-[270px] lg:w-full aspect-[270/400] lg:aspect-[310/400]"
              />
            ))}
          </div>
        </Condition>
        <Defaults>
          <h4 className="text-center text-lg mx-auto w-[400px]">{t('No events for now')}</h4>
        </Defaults>
      </ConditionsList>
    </div>
  );
}

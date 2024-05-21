import {CmsExhibit} from '../../../types/exhibit';
import {UsersNftCardInterface} from '../../../types/nft';
import {EventCard} from '../../shared/EventCard/event-card';
import {ExhibitsRowSkeleton} from '../../shared/Skeletons';

type Props = {
  event: CmsExhibit;
  nfts: UsersNftCardInterface[];
  isEventLocked: boolean;
  isLoadingExhibits: boolean;
  className?: string;
  analyticEventId?: string;
};

export const EventCardView = ({event, nfts, isLoadingExhibits, className, analyticEventId}: Props) => {
  return (
    <>
      {isLoadingExhibits || !event ? (
        <ExhibitsRowSkeleton />
      ) : (
        <EventCard analyticEventId={analyticEventId} nfts={nfts} className={className} event={event} />
      )}
    </>
  );
};

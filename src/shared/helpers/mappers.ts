import {AvailabilityStatus, NftType} from '@cere/services-types';

import {EventTimelineStatus} from '../types/event';
import {CmsExhibitionNftRelType} from '../types/graphql';

export const nftTypeToCmsType = (item: NftType): CmsExhibitionNftRelType => {
  switch (item) {
    case NftType.ACCESS:
      return CmsExhibitionNftRelType.ACCESS;
    case NftType.LIMITED:
      return CmsExhibitionNftRelType.LIMITED;
    case NftType.AUCTIONED:
      return CmsExhibitionNftRelType.AUCTIONED;
  }
};

export const cmsTypeToNftType = (item: CmsExhibitionNftRelType): NftType => {
  switch (item) {
    case CmsExhibitionNftRelType.ACCESS:
      return NftType.ACCESS;
    case CmsExhibitionNftRelType.LIMITED:
      return NftType.LIMITED;
    case CmsExhibitionNftRelType.AUCTIONED:
      return NftType.AUCTIONED;
  }
};

export const mapNftAvailabilityStatusToEventTimelineStatus = (status: AvailabilityStatus): EventTimelineStatus => {
  switch (status) {
    case AvailabilityStatus.COMING_SOON:
      return EventTimelineStatus.NOT_STARTED;
    case AvailabilityStatus.ONGOING:
      return EventTimelineStatus.STARTED;
    case AvailabilityStatus.OFFER_ENDED:
      return EventTimelineStatus.FINISHED;
    case AvailabilityStatus.SOLD_OUT:
      return EventTimelineStatus.FINISHED;
  }
};

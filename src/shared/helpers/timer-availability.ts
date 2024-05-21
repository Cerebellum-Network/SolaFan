import {AvailabilityStatus, CheckUserHasNftEnum, NftType} from '@cere/services-types';

import {EventTimelineStatus} from '../types/event';

export const getNftEndsDateTime = (
  counterTime?: string,
  nftType?: NftType,
  timelineStatus?: string,
  nftAvailability?: AvailabilityStatus,
  purchaseStatus?: CheckUserHasNftEnum,
) => {
  return !counterTime ||
    nftType !== NftType.ACCESS ||
    timelineStatus === EventTimelineStatus.FINISHED ||
    timelineStatus === EventTimelineStatus.NOT_STARTED ||
    nftAvailability === AvailabilityStatus.COMING_SOON ||
    nftAvailability === AvailabilityStatus.OFFER_ENDED ||
    nftAvailability === AvailabilityStatus.SOLD_OUT ||
    purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT
    ? ''
    : counterTime;
};

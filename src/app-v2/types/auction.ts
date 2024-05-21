import {BidInterface} from '@cere/services-types';

export enum BID_STATUSES {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface BidInterfaceWithStatus extends BidInterface {
  bidStatus: BID_STATUSES;
}

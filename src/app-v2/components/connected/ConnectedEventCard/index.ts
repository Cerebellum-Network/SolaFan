import {CheckUserHasNftEnum} from '@cere/services-types';
import {connect} from 'react-redux';

import {selectExhibitBySlug} from '../../../redux/modules/exhibits/selectors';
import {selectExhibitsLoadingState} from '../../../redux/modules/exhibits-page/selectors';
import {selectNftsByExhibitSlugs} from '../../../redux/modules/nfts/selectors';
import {EventCardView} from './EventCardView';

const createMapStateToProps = (state: any, {slug, analyticEventId}: {slug: string; analyticEventId?: string}) => {
  const event = selectExhibitBySlug(state, slug)!;
  const eventNfts = selectNftsByExhibitSlugs(state, slug) || [];

  const isEventLocked = !eventNfts.every(({purchaseStatus}) => purchaseStatus === CheckUserHasNftEnum.USER_HAS_NFT);
  return {
    event,
    analyticEventId,
    nfts: eventNfts,
    isEventLocked,
    isLoadingExhibits: selectExhibitsLoadingState(state),
  };
};

export const ConnectedEventCard = connect(createMapStateToProps)(EventCardView);

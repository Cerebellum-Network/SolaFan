import {connect} from 'react-redux';

import {isHasSuccessTransactions} from '../../../../shared/helpers/paymentStatus';
import {createSelectExhibitNfts} from '../../../redux/modules/exhbit-page/selectors';
import {selectExhibitBySlug} from '../../../redux/modules/exhibits/selectors';
import {EventUnlockProgressView} from './view';

const createMapStateToProps = (state: any, {eventSlug}: {eventSlug: string}) => {
  const selectExhibitNfts = createSelectExhibitNfts();

  const event = selectExhibitBySlug(state, eventSlug);
  const nftIds = event?.nfts?.map(({id}) => id);
  const eventNfts = selectExhibitNfts(state, nftIds) || [];
  const nfts = eventNfts
    ?.map(({image, purchaseStatus, ...nft}) => {
      return {
        nftPreviewUrl: image || null,
        unlocked: isHasSuccessTransactions(nft),
        title: nft.title,
        balance: nft.balance,
        supply: nft.supply,
        formats: nft.formats,
      };
    })
    .sort((a, b) => Number(b.unlocked) - Number(a.unlocked));

  const isEventLocked = !nfts.every(({unlocked}) => unlocked === true);

  return {
    nfts,
    isEventLocked,
  };
};

export const ConnectedEventUnlockProgress = connect(createMapStateToProps)(EventUnlockProgressView);

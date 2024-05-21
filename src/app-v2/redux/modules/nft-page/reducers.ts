import {AnyAction, combineReducers} from 'redux';

import {NftOrder} from '../../../api/orders/types';
import {NftTransfer, TransfersWithParams} from '../../../types/transfer';
import {NftsCollectablesLoadingFailedEvent} from '../home-page/actions';
import {
  NftCollectablesLoadedEvent,
  NftDataLoadedEvent,
  NftListingsLoadedEvent,
  NftListingsLoadingFailedEvent,
  NftOrdersDocument,
  NftPageDataLoadingFailedEvent,
  ResetNftPageLoadingStateCommand,
  TransferDocument,
} from './actions';

type NftPageLoadingState = {
  isNftLoading: boolean;
  isLoadingNftsListing: boolean;
  isLoadingNftsCollectibles: boolean;
};

const initialLoadingState: NftPageLoadingState = {
  isNftLoading: true,
  isLoadingNftsListing: true,
  isLoadingNftsCollectibles: true,
};

export const nftPageLoadingReducer = (
  state: NftPageLoadingState = initialLoadingState,
  action: AnyAction,
): NftPageLoadingState => {
  switch (action.type) {
    case ResetNftPageLoadingStateCommand:
      return initialLoadingState;
    case NftDataLoadedEvent.type:
    case NftPageDataLoadingFailedEvent.type:
      return {...state, isNftLoading: false};
    case NftListingsLoadedEvent.type:
    case NftListingsLoadingFailedEvent.type:
      return {...state, isLoadingNftsListing: false};
    case NftCollectablesLoadedEvent.type:
    case NftsCollectablesLoadingFailedEvent.type:
      return {...state, isLoadingNftsCollectibles: false};
    default:
      return state;
  }
};

export const nftOrdersReducer = (state: NftOrder[] = [], action: AnyAction) => {
  if (action.type === NftOrdersDocument.type) {
    return action.payload;
  }
  return state;
};

export const nftTransferReducer = (state: NftTransfer[] = [], action: AnyAction) => {
  if (action.type === TransferDocument.type) {
    const documentTransfers: TransfersWithParams[] = action.payload;
    return documentTransfers[0].transfers;
  }
  return state;
};

export const nftDetailsPageReducer = combineReducers({
  loadingState: nftPageLoadingReducer,
  orders: nftOrdersReducer,
  transfers: nftTransferReducer,
});

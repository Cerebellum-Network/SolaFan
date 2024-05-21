import {SupportedWalletType} from '../../../../models/wallet/types';

export type StatusesState = {[key in SupportedWalletType]: boolean};

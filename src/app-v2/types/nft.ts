import {NftCardInterface} from '@cere/services-types';

import {FreeportNftAsset} from './common';
import {Order} from './order';
import {NftTransfer} from './transfer';
import {UploadedImageFormat} from './uploaded-image-format';

export interface UsersNftCardInterface extends NftCardInterface {
  userOwnedCount?: number;
  assets: FreeportNftAsset[];
  unlockingEventsSlugs: string[];
  unlockingEvents: string[];
  formats?: Record<string, UploadedImageFormat>;
  transfers: NftTransfer[];
  primaryOrder?: Order;
  secondaryOrders: Order[];
  ownedBalance?: string;
}

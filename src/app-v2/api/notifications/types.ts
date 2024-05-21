import {NotificationEventType} from '@cere/services-types';
import {UploadFile} from '@cere/services-types';
import {isRecord} from 'app-v2/utils/types/is-record';
import {isNumberish} from 'shared/types/numberish';

import {Numberish} from '../../../shared/types/numberish';
import {TransactionalNotificationsEvent, TransactionalNotificationStatus} from './enums';
export interface NftNotificationParameters {
  id: Numberish;
  title: string;
  assets: {
    content: UploadFile;
  }[];
  cardImage: UploadFile;
}
export interface ExhibitNotificationParameters {
  id: Numberish;
  title: string;
  image: UploadFile;
  slug: string;
}
export interface TransactionalNotification {
  id: Numberish;
  type: NotificationEventType;
  status: TransactionalNotificationStatus;
  nft?: NftNotificationParameters;
  exhibit?: ExhibitNotificationParameters;
  createdAt: string;
}

export interface NotificationItem {
  id: Numberish;
  type: NotificationEventType;
  cmsNftId: Numberish;
  creatorNftId: string;
  exhibitId: Numberish;
  createdAt: string;
  status: TransactionalNotificationStatus;
}

export interface TransactionalNotificationsInterface {
  setUserCredentials: (token: string) => void;
  list: TransactionalNotification[];
  totalCount: number;
  isFirstPageLoading: boolean;
  isNextPageLoading: boolean;
  newNotificationsCount: number;
  subscribe<T>(event: TransactionalNotificationsEvent, handler: (payload?: {detail: T}) => void): () => void;
  reset: () => void;
  resetList: () => void;
  loadFirstPage: () => Promise<void>;
  loadNextPage: () => Promise<void>;
  loadNewNotificationsCount: () => Promise<void>;
  markAsUnread: (id: Numberish) => Promise<void>;
  markAsRead: (id: Numberish) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export interface INotificationsApi {
  getNotifications(userId: string, pagination?: PaginatedRequest): Promise<GetNotificationResponse>;
  getNewNotificationsCount(userId: string): Promise<number>;
  markAsRead(userId: string, notificationId: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  markAsUnread(userId: string, notificationId: string): Promise<void>;
  dedupeNotifications(
    existingNotifications: TransactionalNotification[],
    newNotifications: TransactionalNotification[],
  ): TransactionalNotification[];
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
}

export interface FetchNotificationsResponse {
  data: NotificationItem[];
  total: number;
}

export interface GetNotificationResponse {
  data: TransactionalNotification[];
  total: number;
}

export const isNotificationsResponse = (val: unknown): val is Promise<GetNotificationResponse> =>
  isRecord(val) && isNumberish(val.total) && Array.isArray(val.data);

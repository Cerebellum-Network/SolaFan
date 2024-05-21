import {TransactionalNotificationStatus} from 'app-v2/api/notifications/enums';
import {
  ExhibitNotificationParameters,
  NftNotificationParameters,
  NotificationItem,
  TransactionalNotification,
} from 'app-v2/api/notifications/types';
import {Numberish} from 'app-v2/types/exhibit';
import {unwrap} from 'shared/lib/unwrap';
import {GET_EXHIBITIONS_NOTIFICATIONS_DATA, GET_NFTS_NOTIFICATIONS_DATA} from 'shared/queries/notifications';

import {IGraphQLClient} from '../api-clients/IGraphQLClient';
import {IRESTClient} from '../api-clients/IRESTClient';
import {
  FetchNotificationsResponse,
  GetNotificationResponse,
  INotificationsApi,
  isNotificationsResponse,
  PaginatedRequest,
} from './types';

export const NOTIFICATIONS_API_DEFAULT_PAGE = 0;
export const NOTIFICATIONS_API_DEFAULT_LIMIT = 8;

export class NotificationsApi implements INotificationsApi {
  constructor(private readonly restClient: IRESTClient, private readonly apolloClient: IGraphQLClient) {}

  async getNotifications(
    userId: string,
    pagination: PaginatedRequest = {page: NOTIFICATIONS_API_DEFAULT_PAGE, limit: NOTIFICATIONS_API_DEFAULT_LIMIT},
  ): Promise<GetNotificationResponse> {
    const {data, total} = await this.fetchNotifications(userId, pagination);
    const notifications = await this.extendNotificationsData(data);

    return {data: notifications, total};
  }

  async getNewNotificationsCount(userId: string): Promise<number> {
    const {total} = await this.fetchNotifications(userId, {page: NOTIFICATIONS_API_DEFAULT_PAGE, limit: 20}, [
      TransactionalNotificationStatus.NEW,
      TransactionalNotificationStatus.UNREAD,
    ]);

    return total;
  }

  async markAsRead(userId: string, notificationId: Numberish): Promise<void> {
    await this.patchNotification(userId, notificationId, TransactionalNotificationStatus.READ);
  }

  async markAsUnread(userId: string, notificationId: Numberish): Promise<void> {
    await this.patchNotification(userId, notificationId, TransactionalNotificationStatus.UNREAD);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.patchNotifications(userId, TransactionalNotificationStatus.READ);
  }

  dedupeNotifications(
    existingNotifications: TransactionalNotification[],
    newNotifications: TransactionalNotification[],
  ): TransactionalNotification[] {
    const uniqueNotifications = new Set([...existingNotifications, ...newNotifications]);
    return Array.from(uniqueNotifications);
  }

  private async fetchNotifications(
    userId: string,
    {page = NOTIFICATIONS_API_DEFAULT_PAGE, limit = NOTIFICATIONS_API_DEFAULT_LIMIT}: PaginatedRequest = {
      page: NOTIFICATIONS_API_DEFAULT_PAGE,
      limit: NOTIFICATIONS_API_DEFAULT_LIMIT,
    },
    statuses: TransactionalNotificationStatus[] = [],
  ): Promise<FetchNotificationsResponse> {
    const query = new URLSearchParams();
    query.append('page', page.toString());
    query.append('limit', limit.toString());
    if (statuses.length > 0) {
      query.append('statuses', statuses.join(','));
    }

    const response = await this.restClient.makeRequest<FetchNotificationsResponse>(
      'get',
      `users/${userId}/notifications?${query.toString()}`,
      isNotificationsResponse,
    );
    return unwrap(response);
  }

  private async patchNotification(
    userId: string,
    notificationId: Numberish,
    status: TransactionalNotificationStatus,
  ): Promise<void> {
    await this.restClient.makeRequest('patch', `users/${userId}/notifications/${notificationId}`, () => true, {status});
  }

  private async patchNotifications(userId: string, status: TransactionalNotificationStatus): Promise<void> {
    await this.restClient.makeRequest('patch', `users/${userId}/notifications`, () => true, {status});
  }

  private async extendNotificationsData(data: NotificationItem[]): Promise<TransactionalNotification[]> {
    const [nftsData, exhibitsData] = await Promise.all([
      this.getNftNotificationsData(data),
      this.getExhibitionNotificationsData(data),
    ]);

    return data.map((notification) => ({
      id: notification.id,
      type: notification.type,
      status: notification.status,
      createdAt: notification.createdAt,
      nft: notification.cmsNftId ? nftsData?.find(({id}) => Number(notification.cmsNftId) === Number(id)) : undefined,
      exhibit: notification.exhibitId
        ? exhibitsData?.find(({id}) => Number(notification.exhibitId) === Number(id))
        : undefined,
    }));
  }

  private async getNftNotificationsData(data: NotificationItem[]): Promise<NftNotificationParameters[]> {
    const uniqueIds = new Set(data.map(({cmsNftId}) => cmsNftId).filter(Boolean));

    if (uniqueIds.size === 0) {
      return [];
    }

    const cmsData = await this.apolloClient.makeQuery<NftNotificationParameters[]>(
      GET_NFTS_NOTIFICATIONS_DATA,
      {ids: Array.from(uniqueIds)},
      'cmsV2Nfts',
      () => true,
    );

    return unwrap(cmsData);
  }

  private async getExhibitionNotificationsData(data: NotificationItem[]): Promise<ExhibitNotificationParameters[]> {
    const uniqueIds = new Set(data.map(({exhibitId}) => exhibitId).filter(Boolean));

    if (uniqueIds.size === 0) {
      return [];
    }

    const cmsData = await this.apolloClient.makeQuery<ExhibitNotificationParameters[]>(
      GET_EXHIBITIONS_NOTIFICATIONS_DATA,
      {ids: Array.from(uniqueIds)},
      'cmsV2Exhibits',
      () => true,
    );

    return unwrap(cmsData);
  }
}

export const createNotificationsApi = (restClient: IRESTClient, apolloClient: IGraphQLClient) =>
  new NotificationsApi(restClient, apolloClient);

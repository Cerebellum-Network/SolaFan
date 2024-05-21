export enum TransactionalNotificationStatus {
  NEW = 'NEW',
  UNREAD = 'UNREAD',
  READ = 'READ',
}

export enum TransactionalNotificationsEvent {
  LIST_UPDATED = 'transactional_notifications_list_updated',
  NOTIFICATION_CREATED = 'transactional_notification_created',
  IS_FIRST_PAGE_LOADING_UPDATED = 'transactional_notification_is_first_page_loading_updated',
  IS_NEXT_PAGE_LOADING_UPDATED = 'transactional_notification_is_next_page_loading_updated',
  TOTAL_COUNT_UPDATED = 'transactional_notification_total_count_updated',
  NEW_COUNT_UPDATED = 'transactional_notification_new_count_updated',
}

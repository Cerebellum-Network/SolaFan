import {Numberish} from 'app-v2/types/exhibit';

import {BaseAction} from '../../base/BaseAction';

const notifications = '[NOTIFICATIONS]';

export class FetchNotificationsStarted extends BaseAction {
  static type = `${notifications} Fetch notifications started`;
}

export class FetchNotificationsFinished extends BaseAction {
  static type = `${notifications} Fetch notifications finished`;
}

export class FetchNotificationsFailed extends BaseAction {
  static type = `${notifications} Fetch notifications failed`;
}

export class FetchNotificationsCommand {
  static type = `${notifications} Fetch notifications`;
  static create() {
    return {
      type: this.type,
    };
  }
}

export class FetchNotificationsNextPageCommand {
  static type = `${notifications} Fetch notifications next page`;
  static create() {
    return {
      type: this.type,
    };
  }
}

export class NotificationsPageNumber {
  static type = `${notifications} Notification page`;
  static create(page: number) {
    return {
      type: this.type,
      payload: page,
    };
  }
}

export class NotificationsDocument {
  static type = `${notifications} Notifications document`;
  static create(notifications: any) {
    return {
      type: this.type,
      payload: notifications,
    };
  }
}

export class NotificationsCount {
  static type = `${notifications} Notifications count`;
  static create(count: number) {
    return {
      type: this.type,
      payload: count,
    };
  }
}

export class NewNotificationsCount {
  static type = `${notifications} New notifications count`;
  static create(count: number) {
    return {
      type: this.type,
      payload: count,
    };
  }
}

export class MarkAsReadCommand {
  static type = `${notifications} Mark as read`;
  static create(id: Numberish) {
    return {
      type: this.type,
      payload: id,
    };
  }
}

export class MarkAllAsReadCommand {
  static type = `${notifications} Mark all as read`;
  static create() {
    return {
      type: this.type,
    };
  }
}

export class MarkAsUnreadCommand {
  static type = `${notifications} Mark as unread`;
  static create(id: Numberish) {
    return {
      type: this.type,
      payload: id,
    };
  }
}

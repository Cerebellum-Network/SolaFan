import {CmsAppConfig} from '@cere/services-types';

import {BaseAction} from '../../base/BaseAction';

const CONFIG = '[CONFIG]';

export class LoadAppConfigCommand extends BaseAction {
  static type = `${CONFIG} Load app config`;
}

export class LoadAppConfigIsLoadingEvent {
  static type = `${CONFIG} Load AppConfig is loading event`;
  static create(status: boolean) {
    return {
      type: this.type,
      payload: status,
    };
  }
}

export class LoadAppConfigSuccessEvent extends BaseAction {
  static type = `${CONFIG} Load app config success`;
}

export class LoadAppConfigFailedEvent {
  static type = `${CONFIG} Load app config failed`;
  static create(message: string | null) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class AppConfigDocument {
  static type = `${CONFIG} App config document`;
  static create(config: CmsAppConfig) {
    return {
      type: this.type,
      payload: config,
    };
  }
}

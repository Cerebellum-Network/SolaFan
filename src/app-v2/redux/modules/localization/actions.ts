import {BaseAction} from '../../base/BaseAction';

const LOCALE = '[LOCALE]';

export class LoadUserLocaleCommand extends BaseAction {
  static type = `${LOCALE} Load locale`;
}

export class LoadUserLocaleSuccessEvent extends BaseAction {
  static type = `${LOCALE} Load user locale success`;
}

export class LoadUserLocaleFailedEvent {
  static type = `${LOCALE} Load user locale failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class SelectUserLocaleCommand {
  static type = `${LOCALE} Select user locale`;
  static create(locale: string) {
    return {
      type: this.type,
      payload: locale,
    };
  }
}

export class SelectUserLocaleFailedEvent {
  static type = `${LOCALE} Select user locale failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class UserLocaleDocument {
  static type = `${LOCALE} User locale document`;
  static create(locale: string) {
    return {
      type: this.type,
      payload: locale,
    };
  }
}

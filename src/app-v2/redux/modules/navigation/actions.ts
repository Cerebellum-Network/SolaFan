import {History} from 'history';

export class RedirectCommand {
  static type = '[NAVIGATION] Redirect';
  static create(path: string, state?: any) {
    return {
      type: this.type,
      payload: {
        path,
        state,
      },
    };
  }
}

export class HistoryObjectDocument {
  static type = '[NAVIGATION] History object';
  static create(history: History) {
    return {
      type: this.type,
      payload: history,
    };
  }
}

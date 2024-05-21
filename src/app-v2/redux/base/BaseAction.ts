export abstract class BaseAction {
  static readonly type: string;
  static create() {
    return {
      type: this.type,
    };
  }
}

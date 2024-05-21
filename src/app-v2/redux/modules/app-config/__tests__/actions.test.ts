import {AppConfigDocument, LoadAppConfigCommand, LoadAppConfigFailedEvent, LoadAppConfigSuccessEvent} from '../actions';

describe('app config actions', () => {
  it('creates a command to load app config', () => {
    expect(LoadAppConfigCommand.create()).toEqual({
      type: '[CONFIG] Load app config',
    });
  });

  it('creates app config loaded successfully event', () => {
    expect(LoadAppConfigSuccessEvent.create()).toEqual({
      type: '[CONFIG] Load app config success',
    });
  });

  it('creates app config loading failed event', () => {
    expect(LoadAppConfigFailedEvent.create('message')).toEqual({
      type: '[CONFIG] Load app config failed',
      payload: 'message',
    });
  });

  it('creates app config document', () => {
    expect(AppConfigDocument.create('config' as any)).toEqual({
      type: '[CONFIG] App config document',
      payload: 'config',
    });
  });
});

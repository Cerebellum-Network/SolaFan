import {
  LoadUserLocaleCommand,
  LoadUserLocaleFailedEvent,
  LoadUserLocaleSuccessEvent,
  SelectUserLocaleCommand,
  SelectUserLocaleFailedEvent,
  UserLocaleDocument,
} from '../actions';

describe('localization actions', () => {
  it('creates a command to load user locale', () => {
    expect(LoadUserLocaleCommand.create()).toEqual({
      type: '[LOCALE] Load locale',
    });
  });

  it('creates user locale successfully loaded event', () => {
    expect(LoadUserLocaleSuccessEvent.create()).toEqual({
      type: '[LOCALE] Load user locale success',
    });
  });

  it('creates user locale loading failed event', () => {
    expect(LoadUserLocaleFailedEvent.create('message')).toEqual({
      type: '[LOCALE] Load user locale failed',
      payload: 'message',
    });
  });

  it('creates a command to select a locale', () => {
    expect(SelectUserLocaleCommand.create('locale')).toEqual({
      type: '[LOCALE] Select user locale',
      payload: 'locale',
    });
  });

  it('creates user locale setting failed event', () => {
    expect(SelectUserLocaleFailedEvent.create('message')).toEqual({
      type: '[LOCALE] Select user locale failed',
      payload: 'message',
    });
  });

  it('creates user locale document', () => {
    expect(UserLocaleDocument.create('locale')).toEqual({
      type: '[LOCALE] User locale document',
      payload: 'locale',
    });
  });
});

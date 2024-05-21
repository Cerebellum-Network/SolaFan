import {
  CreatorsDocument,
  CreatorsFetchErrorEvent,
  CreatorsFetchingFinishedEvent,
  CreatorsFetchingStartedEvent,
  FetchCreatorsCommand,
} from '../actions/page';

describe('Customers actions', () => {
  it('creates FetchCustomersCommand', () => {
    expect(FetchCreatorsCommand.create()).toEqual({type: '[CREATORS] Fetch all'});
  });

  it('creates CustomersDocument', () => {
    expect(CreatorsDocument.create(['creator1', 'creator2'] as any)).toEqual({
      type: '[CREATORS] Creators document',
      payload: ['creator1', 'creator2'],
    });
  });

  it('creates CustomersFetchErrorEvent', () => {
    expect(CreatorsFetchErrorEvent.create('test message')).toEqual({
      type: '[CREATORS] Creators fetch error',
      payload: 'test message',
    });
  });

  it('creates CustomersFetchingStartedEvent', () => {
    expect(CreatorsFetchingStartedEvent.create()).toEqual({
      type: '[CREATORS] Creators fetching started',
    });
  });

  it('creates CustomersFetchingFinishedEvent', () => {
    expect(CreatorsFetchingFinishedEvent.create()).toEqual({
      type: '[CREATORS] Creators fetching finished',
    });
  });
});

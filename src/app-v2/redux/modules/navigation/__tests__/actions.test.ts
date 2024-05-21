import {HistoryObjectDocument, RedirectCommand} from '../actions';

describe('navigation actions', () => {
  it('creates a command to redirect to path with state', () => {
    expect(RedirectCommand.create('path', 'state')).toEqual({
      type: '[NAVIGATION] Redirect',
      payload: {
        path: 'path',
        state: 'state',
      },
    });
  });

  it('creates history object document', () => {
    expect(HistoryObjectDocument.create('history' as any)).toEqual({
      type: '[NAVIGATION] History object',
      payload: 'history',
    });
  });
});

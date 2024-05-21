import {CloseActiveModalCommand} from '../actions';

describe('modal actions', () => {
  it('creates a command to close active modal', () => {
    expect(CloseActiveModalCommand.create()).toEqual({
      type: '[MODAL] Close',
    });
  });
});

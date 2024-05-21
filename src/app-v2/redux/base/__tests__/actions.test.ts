import {InitAppCommand} from '../actions';

describe('App base actions', () => {
  it('creates app init command', () => {
    expect(InitAppCommand.create()).toEqual({type: '[Application] Init'});
  });
});

import {HideLoaderCommand, ShowLoaderCommand} from '../actions';

describe('actions', () => {
  it('should create an action to show loader', () => {
    expect(ShowLoaderCommand.create()).toEqual({
      type: '[LOADER] Show loader',
    });
  });

  it('should create an action to hide loader', () => {
    expect(HideLoaderCommand.create()).toEqual({
      type: '[LOADER] Hide loader',
    });
  });
});

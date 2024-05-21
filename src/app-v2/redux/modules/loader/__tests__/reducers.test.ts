import {HideLoaderCommand, ShowLoaderCommand} from '../actions';
import {loaderReducer} from '../reducers';

describe('loader reducer', () => {
  const store = {state: {visible: false, text: ''}};
  it('should return the initial state', () => {
    expect(loaderReducer(undefined, {} as any)).toEqual({state: {visible: false, text: ''}});
  });

  it('should handle ShowLoaderCommand', () => {
    expect(loaderReducer(store, ShowLoaderCommand.create('some message here'))).toEqual({
      state: {visible: true, text: 'some message here'},
    });
  });

  it('should handle HideLoaderCommand', () => {
    expect(loaderReducer(store, HideLoaderCommand.create())).toEqual({state: {visible: false, text: ''}});
  });
});

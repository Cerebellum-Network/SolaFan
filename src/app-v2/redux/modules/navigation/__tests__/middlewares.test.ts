import {mockMiddleware} from '../../../base/store.mock';
import {RedirectCommand} from '../actions';
import {redirectMiddleware} from '../middlewares';

describe('navigation middlewares', () => {
  describe('redirectMiddleware', () => {
    it('redirect to the path with state', () => {
      const push = jest.fn();
      const {invoke, next, store} = mockMiddleware(redirectMiddleware);
      store.getState.mockImplementation(() => ({
        navigation: {push},
      }));
      invoke(RedirectCommand.create('path', 'state'));
      expect(next).toBeCalled();
      expect(push).toBeCalledWith('path', 'state');
    });
  });
});

import {LocalizationService} from '../../../../models/localization/LocalizationService';
import {InitAppCommand} from '../../../base/actions';
import {mockMiddleware} from '../../../base/store.mock';
import {
  LoadUserLocaleCommand,
  LoadUserLocaleFailedEvent,
  LoadUserLocaleSuccessEvent,
  SelectUserLocaleCommand,
  SelectUserLocaleFailedEvent,
  UserLocaleDocument,
} from '../actions';
import {loadUserLocaleMiddleware, setUserLocaleMiddleware, startUserLocaleLoadingMiddleware} from '../middlewares';

describe('localization middleware', () => {
  let localizationService: LocalizationService;

  beforeEach(() => {
    localizationService = {
      setUserLocale: jest.fn(),
      getUserLocale: jest.fn(() => 'locale'),
    } as any;
  });

  describe('startUserLocaleLoadingMiddleware', () => {
    it('starts user locale loading', () => {
      const {invoke, next, store} = mockMiddleware(startUserLocaleLoadingMiddleware);
      invoke(InitAppCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(LoadUserLocaleCommand.create());
    });
  });

  describe('loadUserLocaleMiddleware', () => {
    it('loads user locale', () => {
      const {invoke, next, store} = mockMiddleware(loadUserLocaleMiddleware(localizationService));
      invoke(LoadUserLocaleCommand.create());
      expect(next).toBeCalled();
      expect(localizationService.getUserLocale).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([LoadUserLocaleSuccessEvent.create()]);
      expect(call2).toEqual([UserLocaleDocument.create('locale')]);
    });

    it('dispatches an error if user locale loading failed', () => {
      (localizationService.getUserLocale as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadUserLocaleMiddleware(localizationService));
      invoke(LoadUserLocaleCommand.create());
      expect(next).toBeCalled();
      expect(localizationService.getUserLocale).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(LoadUserLocaleFailedEvent.create('message'));
    });
  });

  describe('setUserLocaleMiddleware', () => {
    it('sets user locale', () => {
      const {invoke, next, store} = mockMiddleware(setUserLocaleMiddleware(localizationService));
      invoke(SelectUserLocaleCommand.create('locale'));
      expect(next).toBeCalled();
      expect(localizationService.setUserLocale).toBeCalledWith('locale');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(UserLocaleDocument.create('locale'));
    });

    it('dispatches an error if user locale setting failed', () => {
      (localizationService.setUserLocale as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(setUserLocaleMiddleware(localizationService));
      invoke(SelectUserLocaleCommand.create('locale'));
      expect(next).toBeCalled();
      expect(localizationService.setUserLocale).toBeCalledWith('locale');
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(SelectUserLocaleFailedEvent.create('message'));
    });
  });
});

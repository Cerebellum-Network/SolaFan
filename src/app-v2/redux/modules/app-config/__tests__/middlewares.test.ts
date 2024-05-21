import {IAppConfigApi} from '../../../../api/app-config/IAppConfigApi';
import {InitAppCommand} from '../../../base/actions';
import {mockMiddleware} from '../../../base/store.mock';
import {
  AppConfigDocument,
  LoadAppConfigCommand,
  LoadAppConfigFailedEvent,
  LoadAppConfigIsLoadingEvent,
  LoadAppConfigSuccessEvent,
} from '../actions';
import {loadAppConfigMiddleware, startAppConfigLoadingMiddleware} from '../middlewares';

describe('app config middleware', () => {
  let configApi: IAppConfigApi;

  beforeEach(() => {
    configApi = {
      getAppConfig: jest.fn(() => Promise.resolve('config')),
    } as any;
  });

  describe('startAppConfigLoadingMiddleware', () => {
    it('dispatches a command to load app config', () => {
      const {invoke, next, store} = mockMiddleware(startAppConfigLoadingMiddleware);
      invoke(InitAppCommand.create());
      expect(next).toBeCalled();
      expect(store.dispatch).toBeCalledTimes(1);
      expect(store.dispatch).toBeCalledWith(LoadAppConfigCommand.create());
    });
  });

  describe('loadAppConfigMiddleware', () => {
    it('loads app config', async () => {
      const {invoke, next, store} = mockMiddleware(loadAppConfigMiddleware(configApi));
      store.getState.mockImplementation(() => ({locale: 'en'}));
      await invoke(LoadAppConfigCommand.create());
      expect(next).toBeCalled();
      expect(configApi.getAppConfig).toBeCalledWith('en');
      expect(store.dispatch).toBeCalledTimes(4);
      const [call1, call2, , call3] = store.dispatch.mock.calls;

      expect(call1).toEqual([AppConfigDocument.create('config' as any)]);
      expect(call2).toEqual([LoadAppConfigSuccessEvent.create()]);
      expect(call3).toEqual([LoadAppConfigIsLoadingEvent.create(false)]);
    });

    it('dispatches an error is app config loading failed', async () => {
      (configApi.getAppConfig as jest.Mock).mockImplementationOnce(() => {
        throw new Error('message');
      });
      const {invoke, next, store} = mockMiddleware(loadAppConfigMiddleware(configApi));
      store.getState.mockImplementation(() => ({locale: 'en'}));
      await invoke(LoadAppConfigCommand.create());
      expect(next).toBeCalled();
      expect(configApi.getAppConfig).toBeCalledWith('en');
      expect(store.dispatch).toBeCalledTimes(2);
      expect(store.dispatch).toBeCalledWith(LoadAppConfigFailedEvent.create('message'));
    });
  });
});

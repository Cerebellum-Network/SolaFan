import {CreatorsFetchError} from '../../../../api/creators/CreatorsFetchError';
import {mockApi} from '../../../base/api.mock';
import {mockMiddleware} from '../../../base/store.mock';
import {
  CreatorsDocument,
  CreatorsFetchErrorEvent,
  CreatorsFetchingFinishedEvent,
  CreatorsFetchingStartedEvent,
  FetchCreatorsCommand,
} from '../actions/page';
import {loadCreatorsMiddleware} from '../middlewares';

describe('Creators middlewares', () => {
  describe('loadCreatorsMiddleware', () => {
    it('consumes FetchCreatorsCommand and loads all creators data', async () => {
      const api = {
        getAllCreators: mockApi({dataToReturn: ['creator1', 'creator2']}),
      };
      const {invoke, store, next} = mockMiddleware(loadCreatorsMiddleware(api as any));
      const command = FetchCreatorsCommand.create();
      await invoke(command);
      expect(next).toHaveBeenCalledWith(command);
      expect(store.dispatch.mock.calls.length).toBe(3);
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(call1).toEqual([CreatorsFetchingStartedEvent.create()]);
      expect(call2).toEqual([CreatorsDocument.create(['creator1', 'creator2'] as any)]);
      expect(call3).toEqual([CreatorsFetchingFinishedEvent.create()]);
    });

    it('consumes FetchCreatorsCommand, tries to load the data and dispatches an error event if there are some troubles', async () => {
      const api = {
        getAllCreators: mockApi({shouldFail: true, errorToThrowConstructor: CreatorsFetchError}),
      };
      const {invoke, store, next} = mockMiddleware(loadCreatorsMiddleware(api as any));
      const command = FetchCreatorsCommand.create();
      await invoke(command);
      expect(next).toHaveBeenCalledWith(command);
      expect(store.dispatch.mock.calls.length).toBe(3);
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(call1).toEqual([CreatorsFetchingStartedEvent.create()]);
      expect(call2).toEqual([CreatorsFetchErrorEvent.create(new CreatorsFetchError().message)]);
      expect(call3).toEqual([CreatorsFetchingFinishedEvent.create()]);
    });
  });
});

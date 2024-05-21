import {mockApi} from '../../../base/api.mock';
import {mockMiddleware} from '../../../base/store.mock';
import {
  ExhibitsSeoDocument,
  FetchExhibitsCommand,
  FetchExhibitsFinishedEvent,
  FetchExhibitsSeoCommand,
  FetchExhibitsSeoFinishedEvent,
  FetchExhibitsSeoStartedEvent,
  FetchExhibitsStartedEvent,
} from '../actions';
import {loadExhibitsMiddleware, loadExhibitsSeoMiddleware} from '../middlewares';

describe('Exhibits middlewares', () => {
  describe('loadExhibitsMiddleware', () => {
    it('consumes FetchExhibitsCommand and loads all exhibits data', async () => {
      const api = {
        getAllExhibits: mockApi({dataToReturn: ['exhibit1', 'exhibit1']}),
      };
      const {invoke, store, next} = mockMiddleware(loadExhibitsMiddleware(api as any));
      const command = FetchExhibitsCommand.create();
      await invoke(command);
      expect(next).toHaveBeenCalledWith(command);
      expect(store.dispatch.mock.calls.length).toBe(2);
      const [call1, call2] = store.dispatch.mock.calls;
      expect(call1).toEqual([FetchExhibitsStartedEvent.create()]);
      expect(call2).toEqual([FetchExhibitsFinishedEvent.create()]);
    });

    it('consumes FetchExhibitsSeoCommand and loads all exhibits seo data', async () => {
      const api = {
        getExhibitsSeo: mockApi({dataToReturn: ['exhibitSeo1', 'exhibitSeo1']}),
      };
      const {invoke, store, next} = mockMiddleware(loadExhibitsSeoMiddleware(api as any));
      const command = FetchExhibitsSeoCommand.create();
      await invoke(command);
      expect(next).toHaveBeenCalledWith(command);
      expect(store.dispatch.mock.calls.length).toBe(3);
      const [call1, call2, call3] = store.dispatch.mock.calls;
      expect(call1).toEqual([FetchExhibitsSeoStartedEvent.create()]);
      expect(call2).toEqual([ExhibitsSeoDocument.create(['exhibitSeo1', 'exhibitSeo1'] as any)]);
      expect(call3).toEqual([FetchExhibitsSeoFinishedEvent.create()]);
    });
  });
});

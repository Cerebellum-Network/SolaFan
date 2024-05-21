import {HistoryObjectDocument} from '../actions';
import {historyReducer} from '../reducers';

describe('navigation reducers', () => {
  describe('historyReducer', () => {
    it('stores history object', () => {
      expect(historyReducer(null, HistoryObjectDocument.create('history' as any))).toEqual('history');
    });
  });
});

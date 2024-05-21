import {ExhibitsDocument, FetchExhibitsFinishedEvent, FetchExhibitsStartedEvent} from '../actions';
import {exhibitsPageLoadingReducer, exhibitsPageReducer} from '../reducers';

describe('Exhibits reducers', () => {
  describe('exhibitsPageReducer', () => {
    it('sets exhibits list from ExhibitsDocument payload', () => {
      expect(exhibitsPageReducer([], ExhibitsDocument.create(['exhibit1', 'exhibit2'] as any))).toEqual([
        'exhibit1',
        'exhibit2',
      ]);
    });

    it('return previous state if different action passed', () => {
      expect(exhibitsPageReducer(['exhibit1', 'exhibit2'] as any, {type: 'test'})).toEqual(['exhibit1', 'exhibit2']);
    });
  });

  describe('exhibitsPageLoadingReducer', () => {
    it('sets loading state to true', () => {
      expect(exhibitsPageLoadingReducer(false, FetchExhibitsStartedEvent.create())).toEqual(true);
    });

    it('sets loading state to false', () => {
      expect(exhibitsPageLoadingReducer(true, FetchExhibitsFinishedEvent.create())).toEqual(false);
    });

    it('returns default state', () => {
      expect(exhibitsPageLoadingReducer(true, {type: 'test'})).toEqual(true);
    });
  });
});

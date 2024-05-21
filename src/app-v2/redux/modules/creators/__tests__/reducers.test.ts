import {CreatorsDocument, CreatorsFetchingFinishedEvent, CreatorsFetchingStartedEvent} from '../actions/page';
import {allCreatorsReducer, creatorsLoadingReducer} from '../reducers/page';

describe('Creators reducers', () => {
  describe('allCreatorReducer', () => {
    it('sets creators list from CreatorsDocument payload', () => {
      const initialState = {
        ids: [],
        creators: {},
      };
      const action = CreatorsDocument.create([
        {id: 'creator1', name: 'Creator 1'},
        {id: 'creator2', name: 'Creator 2'},
      ] as any);
      const nextState = allCreatorsReducer(initialState, action);
      expect(nextState.ids).toEqual(['creator1', 'creator2']);
      expect(nextState.creators).toEqual({
        creator1: {id: 'creator1', name: 'Creator 1'},
        creator2: {id: 'creator2', name: 'Creator 2'},
      });
    });

    it('return previous state if different action passed', () => {
      expect(allCreatorsReducer(['creator1', 'creator2'] as any, {type: 'test'})).toEqual(['creator1', 'creator2']);
    });
  });

  describe('creatorsLoadingReducer', () => {
    it('sets loading state to true', () => {
      expect(creatorsLoadingReducer(false, CreatorsFetchingStartedEvent.create())).toEqual(true);
    });

    it('sets loading state to false', () => {
      expect(creatorsLoadingReducer(true, CreatorsFetchingFinishedEvent.create())).toEqual(false);
    });

    it('returns default state', () => {
      expect(creatorsLoadingReducer(true, {type: 'test'})).toEqual(true);
    });
  });
});

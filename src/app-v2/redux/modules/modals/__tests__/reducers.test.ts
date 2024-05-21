import {CloseActiveModalCommand} from '../actions';
import {activeModalReducer} from '../reducers';

describe('modals reducers', () => {
  describe('activeModalReducer', () => {
    it('stores active modal component and props', () => {
      expect(activeModalReducer(null, {type: '[MODAL] test', component: 'component', payload: 'props'})).toEqual({
        component: 'component',
        props: 'props',
      });
    });

    it('clears the store on CloseActiveModalCommand', () => {
      expect(
        activeModalReducer({component: 'component', props: 'props'} as any, CloseActiveModalCommand.create()),
      ).toEqual(null);
    });

    it('returns stored values by default', () => {
      expect(activeModalReducer({component: 'component', props: 'props'} as any, {type: 'test'})).toEqual({
        component: 'component',
        props: 'props',
      });
    });
  });
});

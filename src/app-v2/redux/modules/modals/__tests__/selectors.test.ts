import {NoSuchModuleError} from '../../../base/NoSuchModuleError';
import {selectCurrentModalAndProps} from '../selectors';

describe('modals selectors', () => {
  describe('selectCurrentModalAndProps', () => {
    it('returns modal`s component and props', () => {
      expect(selectCurrentModalAndProps({modal: {component: 'component', props: 'props'} as any})).toEqual({
        component: 'component',
        props: 'props',
      });
    });

    it('throws an error if the module was not added to the store', () => {
      expect(() => selectCurrentModalAndProps({} as any)).toThrow(NoSuchModuleError);
    });
  });
});

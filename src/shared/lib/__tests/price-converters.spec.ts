import {BigNumber} from 'ethers';

import {usdToDecimals} from '../price-converters';

describe('src/shared/lib/price-converters', () => {
  describe('usdToDecimals', () => {
    it('should convert fractional numbers', () => {
      expect(usdToDecimals(4.5, 6).eq(BigNumber.from((4.5 * 10 ** 6).toString()))).toBe(true);
      expect(usdToDecimals(4.5, 18).eq(BigNumber.from((4.5 * 10 ** 18).toString()))).toBe(true);
    });
  });
});

import {BigNumber} from 'ethers';

import {toBigNumber, toNumber} from '../big-number-utils';

describe('src/shared/lib/big-number-utils.ts', () => {
  describe('toBigNumber', () => {
    it('should convert numbers', () => {
      expect(toBigNumber(1).eq(BigNumber.from(1))).toBeTruthy();
    });

    it('should convert hex strings', () => {
      const src = Date.now();
      const hex = `0x${src.toString(16)}`;
      expect(toBigNumber(hex).eq(BigNumber.from(src))).toBeTruthy();

      // @ts-ignore
      const longSrc = 2n ** 5000n / 23777n;
      const longHex = `0x${longSrc.toString(16)}`;
      expect(toBigNumber(longHex).toString()).toBe(longSrc.toString());
    });

    it('should convert strings', () => {
      expect(toBigNumber('1').eq(BigNumber.from(1))).toBeTruthy();
    });

    it('should not throw on numbers more than Number.MAX_SAFE_INTEGER', () => {
      const value = 10000000000000000000000;
      expect(value > Number.MAX_SAFE_INTEGER).toBeTruthy();
      expect(() => toBigNumber(value)).not.toThrow();
    });

    it('should not to throw on convert nullish values', () => {
      expect(() => toBigNumber(undefined)).not.toThrow();
      // @ts-ignore
      expect(() => toBigNumber(null)).not.toThrow();
      expect(() => toBigNumber('')).not.toThrow();
    });
  });
  describe('toNumber', () => {
    it('should convert BigNumber to number', () => {
      expect(toNumber(BigNumber.from(10234))).toBe(10234);
    });
    it('should not throw if big number more then Number.MAX_SAFE_INTEGER', () => {
      expect(() => BigNumber.from(100).pow(20).toNumber()).toThrow();
      expect(() => toNumber(BigNumber.from(100).pow(20))).not.toThrow();
    });
  });
});

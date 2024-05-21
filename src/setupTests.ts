// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
require('dotenv').config();

jest.mock('@linaria/react', () => {
  function styled(tag: string | symbol) {
    return jest.fn(() => tag);
  }
  return {
    styled: new Proxy(styled, {
      get(o, prop) {
        return o(prop);
      },
    }),
  };
});

jest.mock('@linaria/core', () => ({
  css: jest.fn(() => ''),
}));

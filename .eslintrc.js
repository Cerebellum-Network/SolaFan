module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'react-app/jest'],
  plugins: ['react-hooks', 'simple-import-sort'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  env: {
    node: true,
    jest: true,
    browser: true,
    webextensions: true,
    jquery: true,
  },
};

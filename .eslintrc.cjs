/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 80 }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'quote-props': ['error', 'as-needed'],
  },
};

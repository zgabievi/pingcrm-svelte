module.exports = {
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'svelte3/named-blocks': 'off'
  }
};

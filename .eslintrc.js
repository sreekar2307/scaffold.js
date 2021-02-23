module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['node'],
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/no-callback-literal': 'error',
    'node/no-extraneous-require': 'error',
    'node/no-missing-require': [
      'error',
      {
        resolvePaths: [__dirname],
        tryExtensions: ['.js', '.json', '.node'],
      },
    ],
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
  },
};

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 4 },
      'ObjectPattern': { 'multiline': true },
      'ImportDeclaration': { 'multiline': true, 'minProperties': 4 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 4 }
    }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'eol-last': ['error', 'always']
  },
}

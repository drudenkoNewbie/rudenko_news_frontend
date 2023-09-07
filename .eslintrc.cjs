module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'react', 'import'],
  ignorePatterns: ['dist/', 'tsconfig.json'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'parent', 'sibling'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ]
      }
    ],
    'no-magic-numbers': ['error', { 'ignoreArrayIndexes': true, 'ignore': [0, 1] }],
    'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
    'react/jsx-no-useless-fragment': [
      'error',
      { allowExpressions: true }
    ],
    'no-multiple-empty-lines': [
      'error',
      { max: 1, maxBOF: 0, maxEOF: 1 }
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['let', 'const'],
        next: ['if', 'expression', 'try', 'switch']
      },
      { blankLine: 'always', prev: '*', next: ['export', 'return'] },
      { blankLine: 'always', prev: 'if', next: 'let' }
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        'allowString': false,
        'allowNumber': false,
        'allowAny': false,
        'allowNullableObject': false,
        'allowNullableBoolean': false,
        'allowNullableString': false,
        'allowNullableNumber': false
      }
    ],
    'no-implicit-coercion': 'error'
  }
};

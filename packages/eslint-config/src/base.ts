const config = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      { allowList: { props: true, args: true, TFunc: true, TArgs: true } },
    ],
  },
  overrides: [
    {
      files: '**/*.cjs',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '**/__tests__/**',
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
} as const

export = config

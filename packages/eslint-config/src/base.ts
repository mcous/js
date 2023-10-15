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
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: { TFunc: true, TArgs: true },
        replacements: {
          args: { arguments: false },
          params: { parameters: false },
          props: { properties: false },
        },
      },
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
      extends: ['plugin:vitest/recommended'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
} as const

export = config

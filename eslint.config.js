import baseConfig from '@mcous/eslint-config'

export default [
  { ignores: ['**/dist', '**/bin', '**/templates'] },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...baseConfig,
  {
    rules: {
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',
    },
  },
]

import js from '@eslint/js'
import eslintPluginVitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPromise from 'eslint-plugin-promise'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    name: '@mcous/eslint-config/base',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: true,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        },
      ],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            TFunc: true,
            TArgs: true,
          },
          replacements: {
            args: { arguments: false },
            params: { parameters: false },
            props: { properties: false },
          },
        },
      ],
    },
  },
  {
    name: '@mcous/eslint-config/simple-import-sort',
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    name: '@mcous/eslint-config/vitest',
    files: ['**/__tests__/**'],
    extends: [eslintPluginVitest.configs.recommended],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
)

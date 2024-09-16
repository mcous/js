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
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPromise.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
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
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
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
    files: ['**/__tests__/**'],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
)

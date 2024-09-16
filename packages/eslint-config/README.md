# @mcous/eslint-config

[My][@mcous] common [ESLint][] configuration.

[@mcous]: https://github.com/mcous
[eslint]: https://eslint.org/

## Install

```shell
pnpm add --save-dev eslint typescript @mcous/eslint-config
```

## Usage

Use the [base config](./src/base.js) for vanilla JavaScript / TypeScript projects. Be sure to add your root directory to `languageOptions.parserOptions.tsconfigRootDir`

```js
// eslint.config.js
import baseConfig from '@mcous/eslint-config'

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
```

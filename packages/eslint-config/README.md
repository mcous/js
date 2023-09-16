# @mcous/eslint-config

[My][@mcous] common [ESLint][] configuration.

[@mcous]: https://github.com/mcous
[eslint]: https://eslint.org/

## Install

Install, allowing peer dependencies to be resolved by your package manager:

```shell
npm install --save-dev @mcous/eslint-config eslint
```

Install, with peer dependencies explicitly specified:

```shell
npm install --save-dev \
  @mcous/eslint-config \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-prettier \
  eslint-plugin-promise \
  eslint-plugin-sonarjs \
  eslint-plugin-unicorn
```

## Usage

Use the [base config](./base.cjs) for vanilla JavaScript / TypeScript projects. Be sure to add your `tsconfig.json` files to `parserOptions.project`.

```js
// .eslintrc.cjs
'use strict'

module.exports = {
  root: true,
  extends: '@mcous/eslint-config',
  parserOptions: {
    project: './tsconfig.json',
  },
}
```

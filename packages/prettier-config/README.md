# @mcous/prettier-config

[My][@mcous] common [Prettier][] configuration.

[@mcous]: https://github.com/mcous
[prettier]: https://prettier.io/

## Install

```shell
pnpm add --save-dev prettier @mcous/prettier-config
```

## Usage

Use the [base config](./src/base.js) for React, Vue, and vanilla JavaScript / TypeScript projects.

```js
// prettier.config.js
import baseConfig from '@mcous/prettier-config'

export default {
  ...baseConfig,
}
```

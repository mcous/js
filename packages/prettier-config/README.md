# @mcous/prettier-config

[My][@mcous] common [Prettier][] configuration.

[@mcous]: https://github.com/mcous
[prettier]: https://prettier.io/

## Install

```shell
npm install --save-dev @mcous/prettier-config prettier
```

## Usage

Use the [base config](./base.cjs) for React, Vue, and vanilla JavaScript / TypeScript projects.

```js
// prettier.config.js
export default '@mcous/prettier-config'
```

You can also extend the configuration:

```js
// prettier.config.js
import baseConfig from '@mcous/prettier-config'

export default {
  ...baseConfig,
  // other options here
}
```

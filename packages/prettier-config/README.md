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
// .prettierrc.cjs
'use strict'

module.exports = '@mcous/prettier-config'
```

You can also extend the configuration:

```js
// .prettierrc.cjs
'use strict'

const baseConfig = require('@mcous/prettier-config')

module.exports = {
  ...baseConfig,
  // other options here
}
```

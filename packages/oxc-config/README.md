# @mcous/oxc-config

[My][@mcous] common [oxlint][] and [oxfmt][] configuration.

[@mcous]: https://github.com/mcous
[oxlint]: https://oxc.rs/docs/guide/usage/linter
[oxfmt]: https://oxc.rs/docs/guide/usage/formatter

## Install

```shell
pnpm add --save-dev oxlint oxfmt oxlint-tsgolint @mcous/oxc-config
```

## Usage

```js
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import lintConfig from '@mcous/oxc-config/lint'

export default defineConfig({
  extends: [lintConfig],
})
```

```js
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import fmtConfig from '@mcous/oxc-config/fmt'

export default defineConfig({ ...fmtConfig })
```

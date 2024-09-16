# @mcous/typescript-config

[My][@mcous] common [TypeScript][] configuration.

[@mcous]: https://github.com/mcous
[typescript]: https://www.typescriptlang.org/

## Install

```shell
pnpm add --save-dev typescript @mcous/typescript-config
```

## Usage

Use the [base config](./base.json) for generic TypeScript projects, including code that runs natively in Node.js or isomorphically, in both Node.js and the browser.

```jsonc
// tsconfig.json
{
  "extends": "@mcous/typescript-config/base.json",
  "compilerOptions": {
    // ...project specific options, like `module` and `target`
  },
}
```

# @mcous/js

[My][@mcous] common configurations and [GitHub Actions][] for JavaScript and TypeScript projects:

[@mcous]: https://github.com/mcous
[GitHub Actions]: https://docs.github.com/en/actions/creating-actions/about-custom-actions

## Tool Configurations

| Tool                          | NPM Module                 | Version                                   |
| ----------------------------- | -------------------------- | ----------------------------------------- |
| [ESLint][eslint docs]         | `@mcous/eslint-config`     | [![eslint version][]][eslint npm]         |
| [Prettier][prettier docs]     | `@mcous/prettier-config`   | [![prettier version][]][prettier npm]     |
| [TypeScript][typescript docs] | `@mcous/typescript-config` | [![typescript version][]][typescript npm] |

[eslint docs]: ./packages/eslint-config
[eslint npm]: https://www.npmjs.com/package/@mcous/eslint-config
[eslint version]: https://img.shields.io/npm/v/@mcous/eslint-config?style=flat-square
[prettier docs]: ./packages/prettier-config
[prettier npm]: https://www.npmjs.com/package/@mcous/prettier-config
[prettier version]: https://img.shields.io/npm/v/@mcous/prettier-config?style=flat-square
[typescript docs]: ./packages/typescript-config
[typescript npm]: https://www.npmjs.com/package/@mcous/typescript-config
[typescript version]: https://img.shields.io/npm/v/@mcous/typescript-config?style=flat-square

## Actions

| Action                    | Path                     | Description                                       |
| ------------------------- | ------------------------ | ------------------------------------------------- |
| [Set up Node][setup docs] | `mcous/js/actions/setup` | Install Node, pnpm, and dependencies with caching |

[setup docs]: ./actions/setup

## Contributing

Node.js v18 or higher is required to work on this repository. To get started, clone the repository and install the project's development dependencies using [corepack][] and [pnpm][].

```shell
corepack enable
git clone https://github.com/mcous/js.git
cd js
pnpm install
```

Once your development dependencies are installed, you can verify that all checks and tests are passing:

```shell
# run all checks and builds
pnpm all

# build publish artifacts
pnpm build

# auto-format (modifies files)
pnpm format

# lint and check formatting
pnpm lint
```

[pnpm]: https://pnpm.io/
[corepack]: https://github.com/nodejs/corepack

### Releasing

Modules in this repository are continuously deployed to npm from the `main` branch. To trigger a release, create a commit that bumps `version` in one or more `package.json` files and create a pull request to merge that commit into `main`.

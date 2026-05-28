# mcous/js/actions/setup

Install Node, pnpm, and dependencies with caching in a GitHub Actions workflow of a JS project.

## Usage

Add a `uses: mcous/js/actions/setup@SHA` step to your workflow. The following options may be specified using `with`:

| Input          | Default | Description                       |
| -------------- | ------- | --------------------------------- |
| `setup-node`   | `true`  | Configure Node.js                 |
| `setup-pnpm`   | `true`  | Configure pnpm                    |
| `node-version` | `24`    | Node.js version to install        |
| `registry-url` | Unset   | Registry to configure for publish |
| `run-install`  | `true`  | Run `pnpm install`                |

```yaml
name: ci

on: [push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: mcous/js/actions/setup@SHA
      - run: pnpm run all
```

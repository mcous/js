# mcous/js/actions/setup

Install Node.js, pnpm, and project dependencies.

## Usage

Add a `uses: mcous/js/actions/setup` step to your workflow. The following options may be specified using `with`:

| Input           | Default | Description                       |
| --------------- | ------- | --------------------------------- |
| `node-version`` | `18``   | Node.js version to install        |
| `registry-url`` | Unset   | Registry to configure for publish |
| `run-install``  | `true`  | Run `pnpm install`                |

```yaml
name: ci

on: [push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: mcous/js/actions/setup
      - run: pnpm run all
```

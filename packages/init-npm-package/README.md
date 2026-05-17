# @mcous/init-npm-package

Publish an initial, empty version of an npm package and configure it for [trusted publishing][].

[trusted publishing]: https://docs.npmjs.com/trusted-publishers/

## Usage

```shell
npm login
pnpx @mcous/init-npm-package --name <name> --access <access> --workflow <workflow> --repo <repo> --env <env>"
```

### Example

```shell
pnpx @mcous/init-npm-package --name @mcous/foobar --access public --workflow ci.yaml --repo mcous/foobar --env npm
```

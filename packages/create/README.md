# @mcous/create

Create a new JS project with [my][@mcous] base configurations.

[@mcous]: https://github.com/mcous

## Usage

### Create a new project

Create a new project with ESLint, Prettier, and TypeScript configuration dependencies in a target directory:

```shell
pnpm create @mcous ./new-project
```

### Customize module name, author, and repository

```shell
pnpm create @mcous ./new-project --name="fizzbuzz" --repository="my-org/fizzbuzz" --author="Alter Ego"
```

### Update an existing project

Update/install shared configs and their peer dependencies in an existing project:

```shell
pnpm create @mcous ./existing-project
```

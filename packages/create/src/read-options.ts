import path from 'node:path'

import parseArgv from 'minimist'

export interface ProjectOptions {
  project: string
  name: string
  author: string
  repository: string
  dependencyNames: string[]
}

export class UsageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UsageError'
  }
}

const DEFAULT_REPO_USER = 'mcous'
const DEFAULT_AUTHOR =
  'Michael Cousins <michael@cousins.io> (https://michael.cousins.io)'

interface CLIArguments {
  _: string[]
  name?: string
  author?: string
  repository?: string
  eslint: boolean
  prettier: boolean
  typescript: boolean
}

const CLI_OPTIONS = {
  string: ['name', 'author', 'repository'],
  boolean: ['eslint', 'prettier', 'typescript'],
  default: { eslint: true, prettier: true, typescript: true },
}

export function readOptions(argv: string[]): ProjectOptions {
  const options = parseArgv<CLIArguments>(argv, CLI_OPTIONS)
  const [project] = options._

  if (project === undefined) {
    throw new UsageError('Invalid usage: a project path must be specified')
  }

  const name = options.name ?? path.basename(project)
  const repository = options.repository ?? `${DEFAULT_REPO_USER}/${name}`
  const author = options.author ?? DEFAULT_AUTHOR
  const dependencyNames = [
    options.eslint ? '@mcous/eslint-config' : [],
    options.prettier ? '@mcous/prettier-config' : [],
    options.typescript ? '@mcous/typescript-config' : [],
  ].flat()

  return { project, name, author, repository, dependencyNames }
}

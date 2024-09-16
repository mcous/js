import path from 'node:path'

import type { ProjectOptions } from './read-options.js'

export type ProjectNameOptions = Pick<ProjectOptions, 'name'>

export function getProjectName(
  directory: string,
  options: ProjectNameOptions,
): string {
  return options.name === '.' ? path.basename(directory) : options.name
}

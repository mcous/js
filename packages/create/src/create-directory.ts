import fs from 'node:fs/promises'
import path from 'node:path'

import type { ProjectOptions } from './read-options.js'

export type CreateManifestOptions = Pick<ProjectOptions, 'project'>

export async function createDirectory(
  options: CreateManifestOptions,
): Promise<string> {
  const absolutePathname = path.resolve(options.project)

  await fs.mkdir(absolutePathname, { recursive: true })

  return absolutePathname
}

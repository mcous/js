import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

import type { ProjectOptions } from './read-options.js'
import type { CreateResult } from './result.js'

export type CopyConfigsOptions = Pick<ProjectOptions, 'dependencyNames'>

const configs: Record<string, URL> = {
  '@mcous/eslint-config': new URL(
    '../templates/eslint.config.template.js',
    import.meta.url,
  ),
  '@mcous/prettier-config': new URL(
    '../templates/prettier.config.template.js',
    import.meta.url,
  ),
  '@mcous/typescript-config': new URL(
    '../templates/tsconfig.template.json',
    import.meta.url,
  ),
}

export async function copyConfigs(
  directory: string,
  options: CopyConfigsOptions,
): Promise<CreateResult[]> {
  return Promise.all(
    options.dependencyNames
      .flatMap((name) => configs[name] ?? [])
      .map((url) => copyTemplate(directory, url)),
  )
}

async function copyTemplate(
  directory: string,
  source: URL,
): Promise<CreateResult> {
  const basename = path
    .basename(url.fileURLToPath(source))
    .replace('.template', '')

  const filename = path.join(directory, basename)
  const skipped = await fs
    .copyFile(source, filename, fs.constants.COPYFILE_EXCL)
    .catch((error: unknown) => {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'EEXIST'
      ) {
        return true
      }

      throw error
    })

  return { filename, result: skipped ? 'skipped' : 'wrote' }
}

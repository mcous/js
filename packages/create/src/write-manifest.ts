import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import type { PackageJson } from 'type-fest'

import type { CreateResult } from './result.js'

export async function writeManifest(
  directory: string,
  manifest: PackageJson,
): Promise<CreateResult> {
  const filename = path.resolve(directory, 'package.json')
  const contents = JSON.stringify(manifest, undefined, 2)

  await fs.writeFile(filename, `${contents}${os.EOL}`, 'utf8')

  return { filename, result: 'wrote' }
}

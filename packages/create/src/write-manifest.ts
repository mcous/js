import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import type { PackageJson } from 'type-fest'

export async function writeManifest(
  manifest: PackageJson,
  directory: string,
): Promise<string> {
  const pathname = path.resolve(directory, 'package.json')
  const contents = JSON.stringify(manifest, undefined, 2)

  await fs.writeFile(pathname, `${contents}${os.EOL}`, 'utf8')

  return pathname
}

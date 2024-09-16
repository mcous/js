import { copyConfigs } from './copy-configs.js'
import { createDirectory } from './create-directory.js'
import { createManifest } from './create-manifest.js'
import { readOptions } from './read-options.js'
import type { CreateResult } from './result.js'

export async function create(argv: string[]): Promise<CreateResult[]> {
  const options = readOptions(argv)
  const directory = await createDirectory(options)
  const [manifest, configs] = await Promise.all([
    createManifest(directory, options),
    copyConfigs(directory, options),
  ])

  return [manifest, ...configs]
}

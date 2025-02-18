import { copyConfigs } from './copy-configs.js'
import { createManifest } from './create-manifest.js'
import { readOptions } from './read-options.js'
import type { CreateResult } from './result.js'

export async function create(
  argv: string[],
  workingDirectory: string,
): Promise<CreateResult[]> {
  const options = readOptions(argv, workingDirectory)

  const [manifest, configs] = await Promise.all([
    createManifest(options),
    copyConfigs(options),
  ])

  return [manifest, ...configs]
}

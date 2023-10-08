import { readOptions } from './read-options.js'
import { createDirectory } from './create-directory.js'
import { createManifest } from './create-manifest.js'

export interface CreateResult {
  manifest: string
}

export async function create(argv: string[]): Promise<CreateResult> {
  const options = readOptions(argv)
  const directory = await createDirectory(options.project)
  const manifest = await createManifest({
    directory,
    name: options.name,
    author: options.author,
    repository: options.repository,
    dependencyNames: options.dependencyNames,
  })

  return { manifest }
}

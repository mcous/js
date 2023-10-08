import { fetchPackageVersions } from './fetch-package-versions.js'
import { generateManifest } from './generate-manifest.js'
import { readManifest } from './read-manifest.js'
import { writeManifest } from './write-manifest.js'

export interface ManifestOptions {
  name: string
  author: string
  repository: string
  dependencyNames: string[]
  directory: string
}

export async function createManifest(
  options: ManifestOptions,
): Promise<string> {
  const { name, author, repository, dependencyNames, directory } = options
  const versionTasks = dependencyNames.map((name) => fetchPackageVersions(name))
  const dependencyVersions = await Promise.all(versionTasks)
  const devDependencies = Object.fromEntries(dependencyVersions.flat())
  const existingManifest = await readManifest(directory)
  const manifest = await generateManifest(existingManifest, {
    name,
    author,
    repository,
    devDependencies,
  })

  return writeManifest(manifest, directory)
}

import { fetchPackageVersions } from './fetch-package-versions.js'
import { generateManifest } from './generate-manifest.js'
import { getProjectName } from './get-project-name.js'
import { readManifest } from './read-manifest.js'
import type { ProjectOptions } from './read-options.js'
import type { CreateResult } from './result.js'
import { writeManifest } from './write-manifest.js'

export type CreateManifestOptions = Pick<
  ProjectOptions,
  'name' | 'author' | 'repository' | 'dependencyNames'
>

export async function createManifest(
  directory: string,
  options: CreateManifestOptions,
): Promise<CreateResult> {
  const { author, repository, dependencyNames } = options
  const name = getProjectName(directory, options)
  const versionTasks = [...dependencyNames].map((name) =>
    fetchPackageVersions(name),
  )
  const dependencyVersions = await Promise.all(versionTasks)
  const devDependencies = Object.fromEntries(dependencyVersions.flat())
  const existingManifest = await readManifest(directory)
  const manifest = await generateManifest(existingManifest, {
    name,
    author,
    repository,
    devDependencies,
  })

  return writeManifest(directory, manifest)
}

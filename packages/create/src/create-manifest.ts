import { fetchPackageVersions } from './fetch-package-versions.js'
import { generateManifest } from './generate-manifest.js'
import { readManifest } from './read-manifest.js'
import type { ProjectOptions } from './read-options.js'
import type { CreateResult } from './result.js'
import { writeManifest } from './write-manifest.js'

export type CreateManifestOptions = Pick<
  ProjectOptions,
  'project' | 'name' | 'author' | 'repository' | 'dependencyNames'
>

export async function createManifest(
  options: CreateManifestOptions,
): Promise<CreateResult> {
  const { project, name, author, repository, dependencyNames } = options
  const versionTasks = [...dependencyNames].map((name) =>
    fetchPackageVersions(name),
  )
  const dependencyVersions = await Promise.all(versionTasks)
  const devDependencies = Object.fromEntries(dependencyVersions.flat())
  const existingManifest = await readManifest(project)
  const manifest = await generateManifest(existingManifest, {
    name,
    author,
    repository,
    devDependencies,
  })

  return writeManifest(project, manifest)
}

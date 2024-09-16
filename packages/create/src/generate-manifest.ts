import fs from 'node:fs/promises'

import sortPackageJson from 'sort-package-json'
import type { PackageJson } from 'type-fest'

const PACKAGE_JSON_TEMPLATE = new URL(
  '../templates/package.template.json',
  import.meta.url,
)

export interface GenerateOptions {
  name: string
  author: string
  repository: string
  devDependencies: Record<string, string>
}

export async function generateManifest(
  existingManifest: PackageJson | undefined,
  options: GenerateOptions,
): Promise<PackageJson> {
  const { name, author, repository, devDependencies } = options
  let manifest = existingManifest

  if (!manifest) {
    let template = await fs.readFile(PACKAGE_JSON_TEMPLATE, 'utf8')
    template = template.replaceAll('${{ name }}', name)
    template = template.replaceAll('${{ author }}', author)
    template = template.replaceAll('${{ repository }}', repository)
    manifest = JSON.parse(template) as PackageJson
  }

  return sortPackageJson({
    ...manifest,
    devDependencies: { ...manifest.devDependencies, ...devDependencies },
  }) as PackageJson
}

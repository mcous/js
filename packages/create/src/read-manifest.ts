import fs from 'node:fs/promises'
import path from 'node:path'
import type { PackageJson } from 'type-fest'

const isNoEntityError = (error: unknown): boolean => {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

export async function readManifest(
  directory: string,
): Promise<PackageJson | undefined> {
  const pathname = path.resolve(directory, 'package.json')
  let contents: string | undefined

  try {
    contents = await fs.readFile(pathname, 'utf8')
  } catch (error) {
    if (!isNoEntityError(error)) {
      throw error
    }
  }

  return contents ? (JSON.parse(contents) as PackageJson) : undefined
}

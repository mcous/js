import fs from 'node:fs/promises'
import path from 'node:path'

export interface Options {
  workingDirectory?: string
}

export async function createDirectory(
  pathname: string,
  options: Options = {},
): Promise<string> {
  const absolutePathname = options.workingDirectory
    ? path.resolve(options.workingDirectory, pathname)
    : path.resolve(pathname)

  await fs.mkdir(absolutePathname, { recursive: true })

  return absolutePathname
}

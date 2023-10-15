import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../write-manifest.js'

describe('writeManifest', () => {
  let directory: string

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'write-manifest-'))
  })

  afterEach(async () => {
    await fs.rm(directory, { force: true, recursive: true })
  })

  it('should write a package.json file in a directory', async () => {
    const result = await subject.writeManifest(
      { name: 'cool-package' },
      directory,
    )

    expect(path.dirname(result)).toEqual(directory)
    expect(path.basename(result)).toBe('package.json')
    await expect(fs.readFile(result, 'utf8')).resolves.toMatch(
      /^\{.+"name": "cool-package".+\}\r?\n$/su,
    )
  })
})

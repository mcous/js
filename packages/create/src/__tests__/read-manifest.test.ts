import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../read-manifest.js'

describe('readManifest', () => {
  let directory: string

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'read-manifest-'))
  })

  afterEach(async () => {
    await fs.rm(directory, { force: true, recursive: true })
  })

  it('should read a package.json file in a directory', async () => {
    await fs.writeFile(
      path.join(directory, 'package.json'),
      '{"name": "cool-project"}',
      'utf8',
    )

    const result = await subject.readManifest(directory)

    expect(result).toEqual({ name: 'cool-project' })
  })

  it('should return undefined if manifest does not exist', async () => {
    const result = await subject.readManifest(directory)

    expect(result).toBe(undefined)
  })

  it('should throw other errors', async () => {
    await fs.writeFile(
      path.join(directory, 'package.json'),
      '{name: "invalid-json"}',
      'utf8',
    )

    const result = subject.readManifest(directory)

    await expect(result).rejects.toThrow(/unexpected token/iu)
  })
})

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../create-directory.js'

describe('createDirectory', () => {
  let workingDirectory: string

  beforeEach(async () => {
    workingDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), 'create-directory-'),
    )
  })

  afterEach(async () => {
    await fs.rm(workingDirectory, { force: true, recursive: true })
  })

  it('should create a directory and its absolute path', async () => {
    const result = await subject.createDirectory('./path', { workingDirectory })

    expect(result).toBe(path.join(workingDirectory, 'path'))
    await expect(fs.access(result)).resolves.toEqual(undefined)
  })

  it('should allow a directory that already exists', async () => {
    await fs.mkdir(path.join(workingDirectory, './path'))

    const result = await subject.createDirectory('./path', { workingDirectory })

    expect(result).toBe(path.join(workingDirectory, 'path'))
    await expect(fs.access(result)).resolves.toEqual(undefined)
  })

  it('should resolve relative paths', async () => {
    const relativeDirectory = path.relative('.', workingDirectory)
    const result = await subject.createDirectory('./path', {
      workingDirectory: relativeDirectory,
    })

    expect(result).toBe(path.join(workingDirectory, 'path'))
    await expect(fs.access(result)).resolves.toEqual(undefined)
  })
})

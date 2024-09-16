import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../create-directory.js'

describe('createDirectory', () => {
  let originalWorkingDirectory: string
  let workingDirectory: string

  beforeEach(async () => {
    const temporaryDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), 'create-directory-'),
    )

    originalWorkingDirectory = process.cwd()
    process.chdir(temporaryDirectory)
    workingDirectory = process.cwd()
  })

  afterEach(async () => {
    process.chdir(originalWorkingDirectory)
    await fs.rm(workingDirectory, { force: true, recursive: true })
  })

  it('should create a directory and its absolute path', async () => {
    const result = await subject.createDirectory({ project: './path' })

    expect(result).toBe(path.join(workingDirectory, 'path'))
    await expect(fs.access(result)).resolves.toBeUndefined()
  })

  it('should allow a directory that already exists', async () => {
    await fs.mkdir(path.join(workingDirectory, './path'))

    const result = await subject.createDirectory({ project: './path' })

    expect(result).toBe(path.join(workingDirectory, 'path'))
    await expect(fs.access(result)).resolves.toBeUndefined()
  })
})

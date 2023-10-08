import { describe, expect, it, vi } from 'vitest'
import { when } from 'vitest-when'

import * as subject from '../create.js'
import { readOptions } from '../read-options.js'
import { createDirectory } from '../create-directory.js'
import { createManifest } from '../create-manifest.js'

vi.mock('../read-options.js')
vi.mock('../create-directory.js')
vi.mock('../create-manifest.js')

describe('create project', () => {
  it('should read argv to create the directory and manifest', async () => {
    when(readOptions)
      .calledWith(['./project'])
      .thenReturn({
        project: './project',
        name: 'cool-name',
        author: 'cool-author',
        repository: 'cool/repository',
        dependencyNames: ['cool-dev-dependency'],
      })

    when(createDirectory)
      .calledWith('./project')
      .thenResolve('/path/to/directory')

    when(createManifest)
      .calledWith({
        name: 'cool-name',
        author: 'cool-author',
        repository: 'cool/repository',
        directory: '/path/to/directory',
        dependencyNames: ['cool-dev-dependency'],
      })
      .thenResolve('/path/to/directory/package.json')

    const result = await subject.create(['./project'])

    expect(result).toEqual({
      manifest: '/path/to/directory/package.json',
    })
  })
})

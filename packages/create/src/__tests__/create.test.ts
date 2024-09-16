import { describe, expect, it, vi } from 'vitest'
import { when } from 'vitest-when'

import { copyConfigs } from '../copy-configs.js'
import * as subject from '../create.js'
import { createDirectory } from '../create-directory.js'
import { createManifest } from '../create-manifest.js'
import { readOptions } from '../read-options.js'

vi.mock('../read-options.js')
vi.mock('../create-directory.js')
vi.mock('../create-manifest.js')
vi.mock('../copy-configs.js')

const OPTIONS = {
  project: './project',
  name: 'cool-name',
  author: 'cool-author',
  repository: 'cool/repository',
  dependencyNames: ['cool-dev-dependency'],
}

describe('create project', () => {
  it('should read argv to create the directory and manifest', async () => {
    when(readOptions).calledWith(['./project']).thenReturn(OPTIONS)
    when(createDirectory).calledWith(OPTIONS).thenResolve('/cool/directory')
    when(createManifest)
      .calledWith('/cool/directory', OPTIONS)
      .thenResolve({ result: 'wrote', filename: '/cool/package.json' })
    when(copyConfigs)
      .calledWith('/cool/directory', OPTIONS)
      .thenResolve([{ result: 'skipped', filename: './cool/eslint.config.js' }])

    const result = await subject.create(['./project'])

    expect(result).toEqual([
      { result: 'wrote', filename: '/cool/package.json' },
      { result: 'skipped', filename: './cool/eslint.config.js' },
    ])
  })
})

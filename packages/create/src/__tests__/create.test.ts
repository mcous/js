import { describe, expect, it, vi } from 'vitest'
import { when } from 'vitest-when'

import { copyConfigs } from '../copy-configs.js'
import * as subject from '../create.js'
import { createManifest } from '../create-manifest.js'
import { readOptions } from '../read-options.js'

vi.mock('../read-options.js')
vi.mock('../create-manifest.js')
vi.mock('../copy-configs.js')

const OPTIONS = {
  project: '/cool/project',
  name: 'cool-name',
  author: 'cool-author',
  repository: 'cool/repository',
  dependencyNames: ['cool-dev-dependency'],
}

describe('create project', () => {
  it('should read argv to create the directory and manifest', async () => {
    when(readOptions)
      .calledWith(['./project'], '/cool/directory')
      .thenReturn(OPTIONS)

    when(createManifest)
      .calledWith(OPTIONS)
      .thenResolve({ result: 'wrote', filename: '/cool/package.json' })

    when(copyConfigs)
      .calledWith(OPTIONS)
      .thenResolve([{ result: 'skipped', filename: '/cool/eslint.config.js' }])

    const result = await subject.create(['./project'], '/cool/directory')

    expect(result).toEqual([
      { result: 'wrote', filename: '/cool/package.json' },
      { result: 'skipped', filename: '/cool/eslint.config.js' },
    ])
  })
})

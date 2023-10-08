import { beforeEach, describe, expect, it, vi } from 'vitest'
import { when } from 'vitest-when'

import * as subject from '../create-manifest.js'
import { fetchPackageVersions } from '../fetch-package-versions.js'
import { generateManifest } from '../generate-manifest.js'
import { readManifest } from '../read-manifest.js'
import { writeManifest } from '../write-manifest.js'

vi.mock('../fetch-package-versions.js')
vi.mock('../generate-manifest.js')
vi.mock('../read-manifest.js')
vi.mock('../write-manifest.js')

describe('create manifest', () => {
  beforeEach(() => {
    when(fetchPackageVersions)
      .calledWith('@mcous/eslint-config')
      .thenResolve([
        ['@mcous/eslint-config', '1.2.3'],
        ['eslint', '4.5.6'],
      ])

    when(fetchPackageVersions)
      .calledWith('@mcous/prettier-config')
      .thenResolve([
        ['@mcous/prettier-config', '7.8.9'],
        ['prettier', '10.11.12'],
      ])
  })

  it('should fetch dependencies and place them in a base manifest', async () => {
    when(generateManifest)
      .calledWith(undefined, {
        name: 'cool-name',
        author: 'cool-author',
        repository: 'cool-repository',
        devDependencies: {
          '@mcous/eslint-config': '1.2.3',
          eslint: '4.5.6',
          '@mcous/prettier-config': '7.8.9',
          prettier: '10.11.12',
        },
      })
      .thenResolve({ name: 'cool-package' })

    when(writeManifest)
      .calledWith({ name: 'cool-package' }, '/path/to/directory')
      .thenResolve('/path/to/package.json')

    const result = await subject.createManifest({
      name: 'cool-name',
      author: 'cool-author',
      repository: 'cool-repository',
      directory: '/path/to/directory',
      dependencyNames: ['@mcous/eslint-config', '@mcous/prettier-config'],
    })

    expect(result).toBe('/path/to/package.json')
  })

  it('should update an existing manifest', async () => {
    when(readManifest)
      .calledWith('/path/to/directory')
      .thenResolve({ name: 'already-here' })

    when(generateManifest)
      .calledWith(
        { name: 'already-here' },
        expect.objectContaining({ name: 'cool-name', author: 'cool-author' }),
      )
      .thenResolve({ name: 'cool-existing-package' })

    when(writeManifest)
      .calledWith({ name: 'cool-existing-package' }, '/path/to/directory')
      .thenResolve('/path/to/package.json')

    const result = await subject.createManifest({
      name: 'cool-name',
      author: 'cool-author',
      repository: 'cool-repository',
      directory: '/path/to/directory',
      dependencyNames: ['@mcous/eslint-config', '@mcous/prettier-config'],
    })

    expect(result).toBe('/path/to/package.json')
  })
})

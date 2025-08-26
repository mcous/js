import { describe, expect, it } from 'vitest'

import * as subject from '../read-options.js'

describe('readOptions', () => {
  it('should read the project path', () => {
    const result = subject.readOptions(['./path'], '/cool/directory')

    expect(result).toEqual({
      project: '/cool/directory/path',
      name: 'path',
      repository: 'mcous/path',
      author:
        'Michael Cousins <michael@cousins.io> (https://michael.cousins.io)',
      dependencyNames: [
        '@mcous/eslint-config',
        '@mcous/prettier-config',
        '@mcous/typescript-config',
      ],
    })
  })

  it('should raise a usage error if no project', () => {
    const act = () => subject.readOptions([], '/cool/directory')

    expect(act).toThrow(subject.UsageError)
  })

  it('should accept custom name, repo, and author', () => {
    const result = subject.readOptions(
      [
        './path',
        '--name',
        'cool-project',
        '--repository',
        'org/project',
        '--author',
        'Somebody Great',
      ],
      '/cool/directory',
    )

    expect(result).toMatchObject({
      project: '/cool/directory/path',
      name: 'cool-project',
      repository: 'org/project',
      author: 'Somebody Great',
    })
  })

  it('should omit dependencies', () => {
    let result = subject.readOptions(
      ['./path', '--no-eslint'],
      '/cool/directory',
    )
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/prettier-config', '@mcous/typescript-config'],
    })

    result = subject.readOptions(['./path', '--no-prettier'], '/cool/directory')
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/eslint-config', '@mcous/typescript-config'],
    })

    result = subject.readOptions(
      ['./path', '--no-typescript'],
      '/cool/directory',
    )
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/eslint-config', '@mcous/prettier-config'],
    })
  })

  it('should use current working directory', () => {
    const result = subject.readOptions(['.'], '/cool/directory')

    expect(result).toMatchObject({
      project: '/cool/directory',
      name: 'directory',
      repository: 'mcous/directory',
    })
  })
})

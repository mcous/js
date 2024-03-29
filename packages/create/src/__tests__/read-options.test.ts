import { describe, expect, it } from 'vitest'

import * as subject from '../read-options.js'

describe('readOptions', () => {
  it('should read the project path', () => {
    const result = subject.readOptions(['./path'])

    expect(result).toEqual({
      project: './path',
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
    const act = () => subject.readOptions([])

    expect(act).toThrow(subject.UsageError)
  })

  it('should accept custom name, repo, and author', () => {
    const result = subject.readOptions([
      './path',
      '--name',
      'cool-project',
      '--repository',
      'org/project',
      '--author',
      'Somebody Great',
    ])

    expect(result).toMatchObject({
      project: './path',
      name: 'cool-project',
      repository: 'org/project',
      author: 'Somebody Great',
    })
  })

  it('should omit dependencies', () => {
    let result = subject.readOptions(['./path', '--no-eslint'])
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/prettier-config', '@mcous/typescript-config'],
    })

    result = subject.readOptions(['./path', '--no-prettier'])
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/eslint-config', '@mcous/typescript-config'],
    })

    result = subject.readOptions(['./path', '--no-typescript'])
    expect(result).toMatchObject({
      dependencyNames: ['@mcous/eslint-config', '@mcous/prettier-config'],
    })
  })
})

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../copy-configs.js'

describe('copyConfigs', () => {
  let project: string

  beforeEach(async () => {
    project = await fs.mkdtemp(path.join(os.tmpdir(), 'copy-configs-'))
  })

  afterEach(async () => {
    await fs.rm(project, { force: true, recursive: true })
  })

  it.each([
    {
      dependency: '@mcous/eslint-config',
      expectedFilename: 'eslint.config.js',
      expectedContents: "import baseConfig from '@mcous/eslint-config'",
    },
    {
      dependency: '@mcous/prettier-config',
      expectedFilename: 'prettier.config.js',
      expectedContents: "import baseConfig from '@mcous/prettier-config'",
    },
    {
      dependency: '@mcous/typescript-config',
      expectedFilename: 'tsconfig.json',
      expectedContents: '"extends": "@mcous/typescript-config/base.json"',
    },
  ])(
    'should copy $expectedFilename',
    async ({ dependency, expectedFilename, expectedContents }) => {
      const result = await subject.copyConfigs({
        project,
        dependencyNames: [dependency],
      })

      expect(result).toEqual([
        { result: 'wrote', filename: path.join(project, expectedFilename) },
      ])
      const contents = await fs.readFile(result[0]!.filename, 'utf8')
      expect(contents).toContain(expectedContents)
    },
  )

  it('does not overwrite existing configs', async () => {
    await Promise.all([
      fs.writeFile(path.join(project, './eslint.config.js'), "can't", 'utf8'),
      fs.writeFile(path.join(project, './prettier.config.js'), 'touch', 'utf8'),
      fs.writeFile(path.join(project, './tsconfig.json'), 'this', 'utf8'),
    ])

    const result = await subject.copyConfigs({
      project,
      dependencyNames: [
        '@mcous/eslint-config',
        '@mcous/prettier-config',
        '@mcous/typescript-config',
      ],
    })

    expect(result).toEqual([
      {
        result: 'skipped',
        filename: path.join(project, './eslint.config.js'),
      },
      {
        result: 'skipped',
        filename: path.join(project, './prettier.config.js'),
      },
      {
        result: 'skipped',
        filename: path.join(project, './tsconfig.json'),
      },
    ])
    const contents = await Promise.all([
      fs.readFile(result[0]!.filename, 'utf8'),
      fs.readFile(result[1]!.filename, 'utf8'),
      fs.readFile(result[2]!.filename, 'utf8'),
    ])
    expect(contents).toEqual(["can't", 'touch', 'this'])
  })

  it('creates directory if needed', async () => {
    const result = await subject.copyConfigs({
      project: path.join(project, 'subpath'),
      dependencyNames: ['@mcous/eslint-config'],
    })

    expect(result).toEqual([
      {
        result: 'wrote',
        filename: path.join(project, 'subpath', './eslint.config.js'),
      },
    ])
  })
})

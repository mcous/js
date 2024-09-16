import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as subject from '../copy-configs.js'

describe('copyConfigs', () => {
  let directory: string

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'copy-configs-'))
  })

  afterEach(async () => {
    await fs.rm(directory, { force: true, recursive: true })
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
      const result = await subject.copyConfigs(directory, {
        dependencyNames: [dependency],
      })

      expect(result).toEqual([
        { result: 'wrote', filename: path.join(directory, expectedFilename) },
      ])
      const contents = await fs.readFile(result[0]!.filename, 'utf8')
      expect(contents).toContain(expectedContents)
    },
  )

  it('does not overwrite existing configs', async () => {
    await Promise.all([
      fs.writeFile(path.join(directory, './eslint.config.js'), "can't", 'utf8'),
      fs.writeFile(
        path.join(directory, './prettier.config.js'),
        'touch',
        'utf8',
      ),
      fs.writeFile(path.join(directory, './tsconfig.json'), 'this', 'utf8'),
    ])

    const result = await subject.copyConfigs(directory, {
      dependencyNames: [
        '@mcous/eslint-config',
        '@mcous/prettier-config',
        '@mcous/typescript-config',
      ],
    })

    expect(result).toEqual([
      {
        result: 'skipped',
        filename: path.join(directory, './eslint.config.js'),
      },
      {
        result: 'skipped',
        filename: path.join(directory, './prettier.config.js'),
      },
      {
        result: 'skipped',
        filename: path.join(directory, './tsconfig.json'),
      },
    ])
    const contents = await Promise.all([
      fs.readFile(result[0]!.filename, 'utf8'),
      fs.readFile(result[1]!.filename, 'utf8'),
      fs.readFile(result[2]!.filename, 'utf8'),
    ])
    expect(contents).toEqual(["can't", 'touch', 'this'])
  })
})

import { describe, expect, it } from 'vitest'

import * as subject from '../generate-manifest.js'

describe('generateManifest', () => {
  it('should create a new package JSON', async () => {
    const result = await subject.generateManifest(undefined, {
      name: 'cool-package',
      author: 'Cool Author',
      repository: 'cool/repo',
      devDependencies: {
        'cool-dependency': '^1.2.3',
      },
    })

    expect(result).toMatchObject({
      name: 'cool-package',
      author: 'Cool Author',
      version: '0.0.0',
      homepage: 'https://github.com/cool/repo#readme',
      bugs: {
        url: 'https://github.com/cool/repo/issues',
      },
      repository: {
        type: 'git',
        url: 'git+https://github.com/cool/repo.git',
      },
      devDependencies: {
        'cool-dependency': '^1.2.3',
      },
    })
  })

  it('should update an existing package JSON', async () => {
    const result = await subject.generateManifest(
      {
        name: 'existing-package',
        author: 'Existing Author',
        version: '1.2.3',
        homepage: 'https://github.com/existing/repo#readme',
        bugs: {
          url: 'https://github.com/existing/repo/issues',
        },
        repository: {
          type: 'git',
          url: 'git+https://github.com/existing/repo.git',
        },
        devDependencies: {
          'cool-dependency': '^0.1.2',
          'existing-dependency': '^4.5.6',
        },
      },
      {
        name: 'cool-package',
        author: 'Cool Author',
        repository: 'cool/repo',
        devDependencies: {
          'cool-dependency': '^1.2.3',
        },
      },
    )

    expect(result).toMatchObject({
      name: 'existing-package',
      author: 'Existing Author',
      version: '1.2.3',
      homepage: 'https://github.com/existing/repo#readme',
      devDependencies: {
        'cool-dependency': '^1.2.3',
        'existing-dependency': '^4.5.6',
      },
    })
  })
})

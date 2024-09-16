import { describe, expect, it } from 'vitest'

import * as subject from '../get-project-name.js'

describe('getProjectName', () => {
  it('returns name if defined', () => {
    const result = subject.getProjectName('/world', { name: 'hello' })

    expect(result).toBe('hello')
  })

  it('returns directory basename if name is "."', () => {
    const result = subject.getProjectName('/world', { name: '.' })

    expect(result).toBe('world')
  })
})

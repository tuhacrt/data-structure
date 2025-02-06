import { describe, expect, it } from 'vitest'

import { complexArray } from './index'

describe('ts-reset/filter', () => {
  it(`
  Given: complexArray
  When: filter(Boolean)
  Then: Array<number>`, () => {
    const given = complexArray
    const received = given.filter(Boolean)
    const expected = [1, 2, 3]

    expect(received).toEqual(expected)
  })
})

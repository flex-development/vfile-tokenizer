/**
 * @file Unit Tests - constant
 * @module vfile-tokenizer/internal/tests/unit/constant
 */

import testSubject from '#internal/constant'

describe('unit:internal/constant', () => {
  let value: unknown

  beforeAll(() => {
    value = {}
  })

  it('should return function that returns `value`', () => {
    // Act
    const result = testSubject(value)

    // Expect
    expect(result).to.be.a('function')
    expect(result()).to.eq(value)
  })
})

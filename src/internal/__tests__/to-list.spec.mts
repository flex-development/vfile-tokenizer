/**
 * @file Integration Tests - toList
 * @module vfile-tokenizer/internal/tests/unit/toList
 */

import testSubject from '#internal/to-list'

describe('unit:internal/toList', () => {
  it.each<Parameters<typeof testSubject>>([
    [[0, 3, 1, 3]],
    [new Set()]
  ])('should return `value` if `value` is list (%#)', value => {
    expect(testSubject(value)).to.eq(value)
  })

  it('should return new list if `value` is not a list', () => {
    // Arrange
    const value: unknown = 13

    // Act + Expect
    expect(testSubject(value)).to.be.an('array').and.eql([value])
  })
})

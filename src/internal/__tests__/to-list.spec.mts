/**
 * @file Unit Tests - toList
 * @module fsm-tokenizer/internal/tests/unit/toList
 */

import chars from '#enums/chars'
import testSubject from '#internal/to-list'

describe('unit:internal/toList', () => {
  it('should return `value` as array if `value` is a `Set`', () => {
    // Arrange
    const value: Set<any> = new Set([chars.digit0, chars.digit1, chars.digit2])

    // Act
    const result = testSubject(value)

    // Expect
    expect(result).to.not.eq(value)
    expect(result).to.eql([...value])
  })

  it('should return `value` if `value` is an array', () => {
    // Arrange
    const value: unknown = [
      chars.digit0,
      chars.digit3,
      chars.digit1,
      chars.digit3
    ]

    // Act + Expect
    expect(testSubject(value)).to.eq(value)
  })

  it('should return new list if `value` is not an array', () => {
    // Arrange
    const value: unknown = 13

    // Act + Expect
    expect(testSubject(value)).to.be.an('array').and.eql([value])
  })
})

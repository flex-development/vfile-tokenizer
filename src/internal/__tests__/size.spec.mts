/**
 * @file Unit Tests - size
 * @module fsm-tokenizer/internal/tests/unit/size
 */

import chars from '#enums/chars'
import testSubject from '#internal/size'

describe('unit:internal/size', () => {
  it('should return size of `list` (Set)', () => {
    // Arrange
    const list: Set<string> = new Set([chars.digit1, chars.digit3])

    // Act + Expect
    expect(testSubject(list)).to.eq(list.size)
  })

  it('should return size of `list` (array)', () => {
    // Arrange
    const list: string[] = [chars.digit3, chars.digit1, chars.digit3]

    // Act + Expect
    expect(testSubject(list)).to.eq(list.length)
  })
})

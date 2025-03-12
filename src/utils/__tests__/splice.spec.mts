/**
 * @file Unit Tests - splice
 * @module vfile-tokenizer/utils/tests/unit/splice
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import veryLargeList from '#fixtures/very-large-list'
import testSubject from '#utils/splice'

describe('unit:utils/splice', () => {
  it.each<[...Parameters<typeof testSubject>, expected: unknown[]]>([
    [[chars.digit0, chars.digit1], 0, 2, null, [chars.digit0, chars.digit1]],
    [[chars.digit2, chars.digit3], -1, chars.digit2, null, [chars.digit3]],
    [[chars.digit4], -2, chars.digit2, null, [chars.digit4]],
    [[codes.eof, codes.eof], chars.digit0, 1, veryLargeList, [codes.eof]]
  ])('should return removed items (%#)', (
    list,
    start,
    remove,
    items,
    expected
  ) => {
    // Arrange
    const length: number = list.length + (items ? [...items].length : 0)

    // Act
    const result = testSubject(list, start, remove, items)

    // Expect
    expect(list).to.have.property('length', length - result.length)
    expect(result).to.be.an('array').and.eql(expected).and.not.eq(list)
  })
})

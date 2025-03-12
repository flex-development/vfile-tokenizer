/**
 * @file Functional Tests - skip
 * @module vfile-tokenizer/internal/tests/functional/skip
 */

import testSubject from '#internal/skip'
import type {
  Column,
  Line,
  Offset,
  Point
} from '@flex-development/vfile-location'

describe('functional:internal/skip', () => {
  it('should move `point` forward if at skip location', () => {
    // Arrange
    const line: Line = 1
    const offset: Offset = 0
    const point: Point = { column: 1, line, offset }
    const skip: Column = 3

    // Act
    testSubject(point, { [line]: skip })

    // Expect
    expect(point).to.have.property('column', skip)
    expect(point).to.have.property('line', line)
    expect(point).to.have.property('offset', offset + (skip - 1))
  })

  it.each<Parameters<typeof testSubject>>([
    [{ column: 1, line: 1, offset: 0 }, {}],
    [{ column: 2, line: 1, offset: 1 }, { 1: 3 }]
  ])('should not move `point` if not at skip location (%#)', (point, skips) => {
    // Arrange
    const column: Column = point.column
    const line: Line = point.line
    const offset: Offset = point.offset

    // Act
    testSubject(point, skips)

    // Expect
    expect(point).to.have.property('column', column)
    expect(point).to.have.property('line', line)
    expect(point).to.have.property('offset', offset)
  })
})

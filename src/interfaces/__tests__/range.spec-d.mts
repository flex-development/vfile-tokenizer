/**
 * @file Type Tests - Range
 * @module vfile-tokenizer/interfaces/tests/unit-d/Range
 */

import type TestSubject from '#interfaces/range'
import type { RangeInfo } from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Range', () => {
  it('should match [end: RangeInfo]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('end').toEqualTypeOf<RangeInfo>()
  })

  it('should match [start: RangeInfo]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('start')
      .toEqualTypeOf<RangeInfo>()
  })
})

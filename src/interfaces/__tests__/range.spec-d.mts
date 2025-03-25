/**
 * @file Type Tests - Range
 * @module fsm-tokenizer/interfaces/tests/unit-d/Range
 */

import type TestSubject from '#interfaces/range'
import type { RangeInfo } from '@flex-development/fsm-tokenizer'

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

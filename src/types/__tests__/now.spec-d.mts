/**
 * @file Type Tests - Now
 * @module fsm-tokenizer/types/tests/unit-d/Now
 */

import type TestSubject from '#types/now'
import type { Place } from '@flex-development/fsm-tokenizer'
import type { EmptyArray } from '@flex-development/tutils'

describe('unit-d:types/Now', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return Place', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Place>()
    })
  })
})

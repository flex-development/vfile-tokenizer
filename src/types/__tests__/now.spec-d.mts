/**
 * @file Type Tests - Now
 * @module vfile-tokenizer/types/tests/unit-d/Now
 */

import type TestSubject from '#types/now'
import type { EmptyArray } from '@flex-development/tutils'
import type { Place } from '@flex-development/vfile-tokenizer'

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

/**
 * @file Type Tests - Attempt
 * @module vfile-tokenizer/types/tests/unit-d/Attempt
 */

import type TestSubject from '#types/attempt'
import type { Constructs, State } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Attempt', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Constructs, State?, State?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Constructs, State?, State?]>()
    })
  })

  describe('returns', () => {
    it('should return State', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<State>()
    })
  })
})

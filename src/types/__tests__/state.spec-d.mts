/**
 * @file Type Tests - State
 * @module vfile-tokenizer/types/tests/unit-d/State
 */

import type TestSubject from '#types/state'
import type { Optional } from '@flex-development/tutils'
import type { Code } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/State', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return State | undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Optional<TestSubject>>()
    })
  })
})

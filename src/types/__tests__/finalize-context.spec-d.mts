/**
 * @file Type Tests - FinalizeContext
 * @module fsm-tokenizer/types/tests/unit-d/FinalizeContext
 */

import type TestSubject from '#types/finalize-context'
import type { TokenizeContext } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/FinalizeContext', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [TokenizeContext]', () => {
      // Arrange
      type P = [TokenizeContext]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return TokenizeContext | null | undefined', () => {
      // Arrange
      type Expect = TokenizeContext | null | undefined

      // Expect
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Expect>()
    })
  })
})

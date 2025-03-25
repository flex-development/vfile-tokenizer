/**
 * @file Type Tests - Initializer
 * @module fsm-tokenizer/types/tests/unit-d/Initializer
 */

import type TestSubject from '#types/initializer'
import type {
  Effects,
  State,
  TokenizeContext
} from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Initializer', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Effects]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Effects]>()
    })
  })

  describe('returns', () => {
    it('should return State', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<State>()
    })
  })
})

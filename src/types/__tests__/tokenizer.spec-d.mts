/**
 * @file Type Tests - Tokenizer
 * @module fsm-tokenizer/types/tests/unit-d/Tokenizer
 */

import type TestSubject from '#types/tokenizer'
import type {
  Effects,
  State,
  TokenizeContext
} from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Tokenizer', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Effects, State, State]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Effects, State, State]>()
    })
  })

  describe('returns', () => {
    it('should return State', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<State>()
    })
  })
})

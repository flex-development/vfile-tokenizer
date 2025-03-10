/**
 * @file Type Tests - Enter
 * @module vfile-tokenizer/types/tests/unit-d/Enter
 */

import type TestSubject from '#types/enter'
import type {
  Token,
  TokenFields,
  TokenType
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Enter', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [TokenType, (TokenFields | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[TokenType, (TokenFields | null | undefined)?]>()
    })
  })

  describe('returns', () => {
    it('should return Token', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Token>()
    })
  })
})

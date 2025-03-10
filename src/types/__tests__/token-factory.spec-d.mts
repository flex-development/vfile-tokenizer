/**
 * @file Type Tests - TokenFactory
 * @module vfile-tokenizer/types/tests/unit-d/TokenFactory
 */

import type TestSubject from '#types/token-factory'
import type {
  Token,
  TokenInfo,
  TokenType
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/TokenFactory', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [TokenType, TokenInfo]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[TokenType, TokenInfo]>()
    })
  })

  describe('returns', () => {
    it('should return Token', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Token>()
    })
  })
})

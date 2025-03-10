/**
 * @file Type Tests - Guard
 * @module vfile-tokenizer/types/tests/unit-d/Guard
 */

import type TestSubject from '#types/guard'
import type { Code, TokenizeContext } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Guard', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})

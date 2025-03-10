/**
 * @file Type Tests - CodeCheck
 * @module vfile-tokenizer/types/tests/unit-d/CodeCheck
 */

import type TestSubject from '#types/code-check'
import type { Code } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/CodeCheck', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
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

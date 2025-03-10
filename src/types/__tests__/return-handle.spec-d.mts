/**
 * @file Type Tests - ReturnHandle
 * @module vfile-tokenizer/types/tests/unit-d/ReturnHandle
 */

import type TestSubject from '#types/return-handle'
import type { Construct, Info } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/ReturnHandle', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Construct, Info]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Construct, Info]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})

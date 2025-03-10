/**
 * @file Type Tests - SliceSerialize
 * @module vfile-tokenizer/types/tests/unit-d/SliceSerialize
 */

import type TestSubject from '#types/slice-serialize'
import type { Position } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/SliceSerialize', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Position, (boolean | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Position, (boolean | null | undefined)?]>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})

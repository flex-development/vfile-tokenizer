/**
 * @file Type Tests - Preprocess
 * @module vfile-tokenizer/types/tests/unit-d/Preprocess
 */

import type TestSubject from '#types/preprocess'
import type {
  Code,
  Encoding,
  FileLike,
  Value
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Preprocess', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [FileLike | Value | null | undefined, (Encoding | null | undefined)?, (boolean | null | undefined)?]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding?: Encoding | null | undefined,
        end?: boolean | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return Code[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Code[]>()
    })
  })
})

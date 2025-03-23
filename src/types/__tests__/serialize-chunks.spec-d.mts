/**
 * @file Type Tests - SerializeChunks
 * @module vfile-tokenizer/types/tests/unit-d/SerializeChunks
 */

import type TestSubject from '#types/serialize-chunks'
import type { Chunk, SerializeOptions } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/SerializeChunks', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [(Chunk | string)[], (SerializeOptions | boolean | null | undefined)?]', () => {
      // Arrange
      type Params = [
        (Chunk | string)[],
        (SerializeOptions | boolean | null | undefined)?
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Params>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})

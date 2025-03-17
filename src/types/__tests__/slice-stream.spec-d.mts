/**
 * @file Type Tests - SliceStream
 * @module vfile-tokenizer/types/tests/unit-d/SliceStream
 */

import type TestSubject from '#types/slice-stream'
import type { Chunk, Position } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/SliceStream', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Position]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Position]>()
    })
  })

  describe('returns', () => {
    it('should return Chunk[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Chunk[]>()
    })
  })
})

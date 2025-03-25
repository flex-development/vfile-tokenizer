/**
 * @file Type Tests - SliceStream
 * @module fsm-tokenizer/types/tests/unit-d/SliceStream
 */

import type TestSubject from '#types/slice-stream'
import type { Chunk, Range } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/SliceStream', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Range]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Range]>()
    })
  })

  describe('returns', () => {
    it('should return Chunk[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Chunk[]>()
    })
  })
})

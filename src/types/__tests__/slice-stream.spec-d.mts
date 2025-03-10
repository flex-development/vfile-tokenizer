/**
 * @file Type Tests - SliceStream
 * @module vfile-tokenizer/types/tests/unit-d/SliceStream
 */

import type TestSubject from '#types/slice-stream'
import type { Code, Position } from '@flex-development/vfile-tokenizer'

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
    it('should return Code[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Code[]>()
    })
  })
})

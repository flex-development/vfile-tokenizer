/**
 * @file Type Tests - Write
 * @module vfile-tokenizer/types/tests/unit-d/Write
 */

import type TestSubject from '#types/write'
import type {
  Chunk,
  Event,
  FileLike,
  List,
  Value
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Write', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Chunk | FileLike | List<Chunk | FileLike | Value> | Value]', () => {
      // Arrange
      type Params = [Chunk | FileLike | List<Chunk | FileLike | Value> | Value]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Params>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})

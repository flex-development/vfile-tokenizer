/**
 * @file Type Tests - Write
 * @module fsm-tokenizer/types/tests/unit-d/Write
 */

import type TestSubject from '#types/write'
import type {
  Chunk,
  Event,
  List,
  Value
} from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Write', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Chunk | List<Chunk | Value> | Value]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Chunk | List<Chunk | Value> | Value]>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})

/**
 * @file Type Tests - Resolver
 * @module fsm-tokenizer/types/tests/unit-d/Resolver
 */

import type TestSubject from '#types/resolver'
import type { Event, TokenizeContext } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Resolver', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Event[], TokenizeContext]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Event[], TokenizeContext]>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})

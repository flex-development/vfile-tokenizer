/**
 * @file Type Tests - Event
 * @module vfile-tokenizer/types/tests/unit-d/Event
 */

import type tt from '#fixtures/tt'
import type TestSubject from '#types/event'
import type {
  EventType,
  Token,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Event', () => {
  type T = tt.typeMetadata
  type Subject = TestSubject<T>

  it('should match [0: EventType]', () => {
    expectTypeOf<Subject>().toHaveProperty('0').toEqualTypeOf<EventType>()
  })

  it('should match [1: Token<T>]', () => {
    expectTypeOf<Subject>().toHaveProperty('1').toEqualTypeOf<Token<T>>()
  })

  it('should match [2: TokenizeContext]', () => {
    expectTypeOf<Subject>().toHaveProperty('2').toEqualTypeOf<TokenizeContext>()
  })
})

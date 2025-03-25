/**
 * @file Type Tests - TokenInfo
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenInfo
 */

import type TestSubject from '#interfaces/token-info'
import type {
  Position,
  Token,
  TokenFields
} from '@flex-development/fsm-tokenizer'

describe('unit-d:interfaces/TokenInfo', () => {
  it('should extend Position', () => {
    expectTypeOf<TestSubject>().toExtend<Position>()
  })

  it('should extend TokenFields', () => {
    expectTypeOf<TestSubject>().toExtend<TokenFields>()
  })

  it('should match [next?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('next')
      .toEqualTypeOf<Token | undefined>()
  })

  it('should match [previous?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<Token | undefined>()
  })
})

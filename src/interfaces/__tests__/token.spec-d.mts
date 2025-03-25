/**
 * @file Type Tests - Token
 * @module fsm-tokenizer/interfaces/tests/unit-d/Token
 */

import type TestSubject from '#interfaces/token'
import type { TokenInfo, TokenType } from '@flex-development/fsm-tokenizer'

describe('unit-d:interfaces/Token', () => {
  it('should extend TokenInfo', () => {
    expectTypeOf<TestSubject>().toExtend<TokenInfo>()
  })

  it('should match [type: T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<TokenType>()
  })
})

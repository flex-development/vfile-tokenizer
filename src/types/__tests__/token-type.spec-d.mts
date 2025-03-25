/**
 * @file Type Tests - TokenType
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenType
 */

import type TestSubject from '#types/token-type'
import type { TokenTypeMap } from '@flex-development/fsm-tokenizer'

describe('unit-d:interfaces/TokenType', () => {
  it('should equal TokenTypeMap[keyof TokenTypeMap]', () => {
    // Arrange
    type Expect = TokenTypeMap[keyof TokenTypeMap]

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})

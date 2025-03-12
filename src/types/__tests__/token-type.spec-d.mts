/**
 * @file Type Tests - TokenType
 * @module vfile-tokenizer/interfaces/tests/unit-d/TokenType
 */

import type TestSubject from '#types/token-type'
import type { TokenTypeMap } from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/TokenType', () => {
  it('should equal TokenTypeMap[keyof TokenTypeMap]', () => {
    // Arrange
    type Expect = TokenTypeMap[keyof TokenTypeMap]

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})

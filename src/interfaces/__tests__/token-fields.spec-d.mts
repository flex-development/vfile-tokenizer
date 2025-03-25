/**
 * @file Type Tests - TokenFields
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenFields
 */

import type TestSubject from '#interfaces/token-fields'

describe('unit-d:interfaces/TokenFields', () => {
  it('should register token fields', () => {
    expectTypeOf<keyof TestSubject>().not.toBeNever()
  })
})

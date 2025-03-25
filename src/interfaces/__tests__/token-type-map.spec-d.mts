/**
 * @file Type Tests - TokenTypeMap
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenTypeMap
 */

import type TestSubject from '#interfaces/token-type-map'

describe('unit-d:interfaces/TokenTypeMap', () => {
  it('should register token types', () => {
    expectTypeOf<keyof TestSubject>().not.toBeNever()
  })
})

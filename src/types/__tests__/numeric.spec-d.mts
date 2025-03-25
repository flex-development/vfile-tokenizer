/**
 * @file Type Tests - Numeric
 * @module fsm-tokenizer/types/tests/unit-d/Numeric
 */

import type TestSubject from '#types/numeric'

describe('unit-d:types/Numeric', () => {
  it('should equal `${number}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${number}`>()
  })
})

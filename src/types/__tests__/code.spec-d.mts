/**
 * @file Type Tests - Code
 * @module fsm-tokenizer/types/tests/unit-d/Code
 */

import type TestSubject from '#types/code'

describe('unit-d:types/Code', () => {
  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })

  it('should extract number', () => {
    expectTypeOf<TestSubject>().extract<number>().not.toBeNever()
  })
})

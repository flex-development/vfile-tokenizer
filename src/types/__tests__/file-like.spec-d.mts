/**
 * @file Type Tests - FileLike
 * @module fsm-tokenizer/types/tests/unit-d/FileLike
 */

import type TestSubject from '#types/file-like'
import type { Value } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/FileLike', () => {
  it('should match [value: Value]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('value').toEqualTypeOf<Value>()
  })
})

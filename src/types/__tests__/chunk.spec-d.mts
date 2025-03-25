/**
 * @file Type Tests - Chunk
 * @module fsm-tokenizer/types/tests/unit-d/Chunk
 */

import type TestSubject from '#types/chunk'
import type { Code } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Chunk', () => {
  it('should extract Code', () => {
    expectTypeOf<TestSubject>().extract<Code>().not.toBeNever()
  })

  it('should extract NonNullable<Code>[]', () => {
    expectTypeOf<TestSubject>().extract<NonNullable<Code>[]>().not.toBeNever()
  })
})

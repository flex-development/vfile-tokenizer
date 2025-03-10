/**
 * @file Type Tests - Chunk
 * @module vfile-tokenizer/types/tests/unit-d/Chunk
 */

import type TestSubject from '#types/chunk'
import type { Code } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/Chunk', () => {
  it('should extract Code', () => {
    expectTypeOf<TestSubject>().extract<Code>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})

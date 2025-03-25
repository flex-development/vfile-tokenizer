/**
 * @file Type Tests - Constructs
 * @module fsm-tokenizer/types/tests/unit-d/Constructs
 */

import type TestSubject from '#types/constructs'
import type {
  ConstructPack,
  ConstructRecord
} from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Constructs', () => {
  it('should extract ConstructPack', () => {
    expectTypeOf<TestSubject>().extract<ConstructPack>().not.toBeNever()
  })

  it('should extract ConstructRecord', () => {
    expectTypeOf<TestSubject>().extract<ConstructRecord>().not.toBeNever()
  })
})

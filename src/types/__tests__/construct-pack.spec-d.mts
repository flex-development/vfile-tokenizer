/**
 * @file Type Tests - ConstructPack
 * @module vfile-tokenizer/types/tests/unit-d/ConstructPack
 */

import type TestSubject from '#types/construct-pack'
import type { Construct } from '@flex-development/vfile-tokenizer'

describe('unit-d:types/ConstructPack', () => {
  it('should extract Construct', () => {
    expectTypeOf<TestSubject>().extract<Construct>().not.toBeNever()
  })

  it('should extract Construct[]', () => {
    expectTypeOf<TestSubject>().extract<Construct[]>().not.toBeNever()
  })
})

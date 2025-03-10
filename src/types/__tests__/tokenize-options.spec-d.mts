/**
 * @file Type Tests - TokenizeOptions
 * @module vfile-tokenizer/types/tests/unit-d/TokenizeOptions
 */

import type TestSubject from '#types/tokenize-options'
import type { Nilable } from '@flex-development/tutils'
import type {
  Encoding,
  Options,
  PreprocessOptions
} from '@flex-development/vfile-tokenizer'

describe('unit-d:types/TokenizeOptions', () => {
  it('should extend Options', () => {
    expectTypeOf<TestSubject>().toExtend<Options>()
  })

  it('should extend PreprocessOptions', () => {
    expectTypeOf<TestSubject>().toExtend<PreprocessOptions>()
  })

  it('should match [encoding?: Encoding | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('encoding')
      .toEqualTypeOf<Nilable<Encoding>>()
  })
})

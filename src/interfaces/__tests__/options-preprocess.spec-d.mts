/**
 * @file Type Tests - PreprocessOptions
 * @module vfile-tokenizer/interfaces/tests/unit-d/PreprocessOptions
 */

import type TestSubject from '#interfaces/options-preprocess'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/PreprocessOptions', () => {
  it('should match [tabSize?: number | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tabSize')
      .toEqualTypeOf<Nilable<number>>()
  })
})

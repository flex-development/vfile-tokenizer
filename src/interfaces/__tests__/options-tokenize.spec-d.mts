/**
 * @file Type Tests - TokenizeOptions
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenizeOptions
 */

import type TestSubject from '#interfaces/options-tokenize'
import type { Options } from '@flex-development/fsm-tokenizer'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/TokenizeOptions', () => {
  it('should extend Options', () => {
    expectTypeOf<TestSubject>().toExtend<Options>()
  })

  it('should match [breaks?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaks')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})

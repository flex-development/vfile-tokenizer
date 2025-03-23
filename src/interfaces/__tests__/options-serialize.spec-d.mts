/**
 * @file Type Tests - SerializeOptions
 * @module vfile-tokenizer/interfaces/tests/unit-d/SerializeOptions
 */

import type TestSubject from '#interfaces/options-serialize'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/SerializeOptions', () => {
  it('should match [breaks?: boolean | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaks')
      .toEqualTypeOf<Nilable<boolean | string>>()
  })

  it('should match [expandTabs?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('expandTabs')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})

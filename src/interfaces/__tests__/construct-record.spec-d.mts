/**
 * @file Type Tests - ConstructRecord
 * @module fsm-tokenizer/interfaces/tests/unit-d/ConstructRecord
 */

import codes from '#enums/codes'
import type TestSubject from '#interfaces/construct-record'
import type { ConstructPack } from '@flex-development/fsm-tokenizer'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ConstructRecord', () => {
  type Value = Nilable<ConstructPack>

  it('should match [[x: Numeric]: ConstructPack | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(`${codes.graveAccent}`)
      .toEqualTypeOf<Value>()
  })

  it('should match [[x: number]: ConstructPack | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(codes.at)
      .toEqualTypeOf<Value>()
  })

  it('should match [null: ConstructPack | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('null')
      .toEqualTypeOf<Value>()
  })
})

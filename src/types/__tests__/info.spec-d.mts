/**
 * @file Type Tests - Info
 * @module fsm-tokenizer/types/tests/unit-d/Info
 */

import type TestSubject from '#types/info'
import type { Restore } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/Info', () => {
  it('should match [from: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('from').toEqualTypeOf<number>()
  })

  it('should match [restore: Restore]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('restore')
      .toEqualTypeOf<Restore>()
  })
})

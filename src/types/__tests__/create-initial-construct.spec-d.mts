/**
 * @file Type Tests - CreateInitialConstruct
 * @module fsm-tokenizer/types/tests/unit-d/CreateInitialConstruct
 */

import type TestSubject from '#types/create-initial-construct'
import type { InitialConstruct } from '@flex-development/fsm-tokenizer'
import type { EmptyArray } from '@flex-development/tutils'

describe('unit-d:types/CreateInitialConstruct', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return InitialConstruct', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<InitialConstruct>()
    })
  })
})

/**
 * @file Type Tests - DefineSkip
 * @module fsm-tokenizer/types/tests/unit-d/DefineSkip
 */

import type TestSubject from '#types/define-skip'
import type { Point } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/DefineSkip', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Pick<Point, "column" | "line">]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Pick<Point, 'column' | 'line'>]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})

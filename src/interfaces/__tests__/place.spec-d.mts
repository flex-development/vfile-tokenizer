/**
 * @file Type Tests - Place
 * @module fsm-tokenizer/interfaces/tests/unit-d/Place
 */

import type TestSubject from '#interfaces/place'
import type { RangeInfo } from '@flex-development/fsm-tokenizer'
import type { Point } from '@flex-development/vfile-location'

describe('unit-d:interfaces/Place', () => {
  it('should extend Point', () => {
    expectTypeOf<TestSubject>().toExtend<Point>()
  })

  it('should extend Range', () => {
    expectTypeOf<TestSubject>().toExtend<RangeInfo>()
  })
})

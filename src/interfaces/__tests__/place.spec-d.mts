/**
 * @file Type Tests - Place
 * @module vfile-tokenizer/interfaces/tests/unit-d/Place
 */

import type TestSubject from '#interfaces/place'
import type { Point } from '@flex-development/vfile-location'
import type { RangeInfo } from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Place', () => {
  it('should extend Point', () => {
    expectTypeOf<TestSubject>().toExtend<Point>()
  })

  it('should extend Range', () => {
    expectTypeOf<TestSubject>().toExtend<RangeInfo>()
  })
})

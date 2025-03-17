/**
 * @file Type Tests - Place
 * @module vfile-tokenizer/interfaces/tests/unit-d/Place
 */

import type TestSubject from '#interfaces/place'
import type { Point } from '@flex-development/vfile-location'

describe('unit-d:interfaces/Place', () => {
  it('should extend Point', () => {
    expectTypeOf<TestSubject>().toExtend<Point>()
  })

  it('should match [_bufferIndex: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('_bufferIndex')
      .toEqualTypeOf<number>()
  })

  it('should match [_index: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('_index').toEqualTypeOf<number>()
  })
})

/**
 * @file Type Tests - Position
 * @module vfile-tokenizer/interfaces/tests/unit-d/Position
 */

import type TestSubject from '#interfaces/position'
import type { Place } from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Position', () => {
  it('should match [end: Place]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('end').toEqualTypeOf<Place>()
  })

  it('should match [start: Place]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('start').toEqualTypeOf<Place>()
  })
})

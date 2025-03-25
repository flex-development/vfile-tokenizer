/**
 * @file Functional Tests - createDefineSkip
 * @module fsm-tokenizer/internal/tests/functional/createDefineSkip
 */

import testSubject from '#internal/create-define-skip'
import skip from '#internal/skip'
import type {
  Column,
  Line,
  Point
} from '@flex-development/vfile-location'
import createDebug, { type Debugger } from 'debug'

vi.mock('#internal/skip')

describe('functional:internal/createDefineSkip', () => {
  let debug: Debugger

  beforeAll(() => {
    debug = createDebug(import.meta.url)
  })

  describe('defineSkip', () => {
    let place: Point
    let point: Pick<Point, 'column' | 'line'>
    let skips: Record<Line, Column>

    beforeEach(() => {
      place = { column: 1, line: 1, offset: 0 }
      point = { column: 3, line: place.line }
      skips = {}

      testSubject(place, skips, debug)(point)
    })

    it('should add skip point to `skips`', () => {
      expect(skips).to.have.property(String(point.line), point.column)
    })

    it('should try moving `place` forward', () => {
      expect(vi.mocked(skip)).toHaveBeenCalledExactlyOnceWith(place, skips)
    })
  })
})

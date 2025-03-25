/**
 * @file Internal - createDefineSkip
 * @module fsm-tokenizer/internal/createDefineSkip
 */

import skip from '#internal/skip'
import type { DefineSkip } from '@flex-development/fsm-tokenizer'
import type {
  Column,
  Line,
  Point
} from '@flex-development/vfile-location'
import type { Debugger } from 'debug'

/**
 * Create a function to define a skip point.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Point} place
 *  Current point in file
 * @param {Record<Line, Column>} skips
 *  Map, where each key is a line number and each value a column to be skipped
 *  when the tokenizer has reached that line
 * @param {Debugger} debug
 *  Debug logger
 * @return {DefineSkip}
 *  `defineSkip`
 */
function createDefineSkip(
  this: void,
  place: Point,
  skips: Record<Line, Column>,
  debug: Debugger
): DefineSkip {
  return defineSkip

  /**
   * @this {void}
   *
   * @param {Pick<Point, 'column' | 'line'>} point
   *  Skip point
   * @return {undefined}
   */
  function defineSkip(
    this: void,
    point: Pick<Point, 'column' | 'line'>
  ): undefined {
    skips[point.line] = point.column
    return skip(place, skips), void debug('position: define skip: `%j`', point)
  }
}

export default createDefineSkip

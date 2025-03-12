/**
 * @file Internal - skip
 * @module vfile-tokenizer/internal/skip
 */

import type { Column, Line, Point } from '@flex-development/vfile-location'

/**
 * Move `point` a bit forward.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Point} point
 *  Current point
 * @param {Record<Line, Column>} skips
 *  Map, where each key is a line number and each value a column to be skipped
 *  when the tokenizer has reached that line
 * @return {undefined}
 */
function skip(
  this: void,
  point: Point,
  skips: Record<Line, Column>
): undefined {
  if (point.line in skips && point.column < 2) {
    point.column = skips[point.line]!
    point.offset += point.column - 1
  }

  return void point
}

export default skip

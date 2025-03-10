/**
 * @file Type Aliases - DefineSkip
 * @module vfile-tokenizer/types/DefineSkip
 */

import type { Point } from '@flex-development/vfile-tokenizer'

/**
 * Define a skip.
 *
 * As containers may "nibble" a prefix from margins, where a line starts after
 * that prefix can be defined here.
 *
 * When a tokenizer moves after consuming a line ending corresponding to
 * `point.line`, the tokenizer shifts past the prefix based on the column in the
 * shifted point.
 *
 * @see {@linkcode Point}
 *
 * @this {void}
 *
 * @param {Pick<Point, 'column' | 'line'>} point
 *  Skip point
 * @return {undefined}
 */
type DefineSkip = (
  this: void,
  point: Pick<Point, 'column' | 'line'>
) => undefined

export type { DefineSkip as default }

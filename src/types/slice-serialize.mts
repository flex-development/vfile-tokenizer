/**
 * @file Type Aliases - SliceSerialize
 * @module vfile-tokenizer/types/SliceSerialize
 */

import type { Position } from '@flex-development/vfile-tokenizer'

/**
 * Get the text spanning `range`.
 *
 * @see {@linkcode Position}
 *
 * @this {void}
 *
 * @param {Position} range
 *  Slice position
 * @param {boolean | null | undefined} [expandTabs]
 *  Whether to expand tabs
 * @return {string}
 *  Serialized slice
 */
type SliceSerialize = (
  this: void,
  range: Position,
  expandTabs?: boolean | null | undefined
) => string

export type { SliceSerialize as default }

/**
 * @file Type Aliases - SliceSerialize
 * @module fsm-tokenizer/types/SliceSerialize
 */

import type { Range, SerializeOptions } from '@flex-development/fsm-tokenizer'

/**
 * Get the text spanning `range`.
 *
 * @see {@linkcode Range}
 * @see {@linkcode SerializeOptions}
 *
 * @this {void}
 *
 * @param {Range} range
 *  Slice position
 * @param {SerializeOptions | boolean | null | undefined} [options]
 *  Options for serializing or whether to expand tabs
 * @return {string}
 *  Serialized slice
 */
type SliceSerialize = (
  this: void,
  range: Range,
  options?: SerializeOptions | boolean | null | undefined
) => string

export type { SliceSerialize as default }

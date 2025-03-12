/**
 * @file Type Aliases - Preprocess
 * @module vfile-tokenizer/types/Preprocess
 */

import type {
  Code,
  Encoding,
  FileLike,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Turn `value` into character code chunks.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Encoding}
 * @see {@linkcode FileLike}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {FileLike | Value | null | undefined} value
 *  The value to preprocess
 * @param {Encoding | null | undefined} [encoding]
 *  The character encoding to use when `value`
 *  or its contents is {@linkcode Uint8Array}
 * @param {boolean | null | undefined} [end]
 *  Whether the end of stream has been reached
 * @return {Code[]}
 *  Character code chunks
 */
type Preprocess = (
  this: void,
  value: FileLike | Value | null | undefined,
  encoding?: Encoding | null | undefined,
  end?: boolean | null | undefined
) => Code[]

export type { Preprocess as default }

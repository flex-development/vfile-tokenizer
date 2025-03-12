/**
 * @file Type Aliases - Write
 * @module vfile-tokenizer/types/Write
 */

import type {
  Chunk,
  Event,
  FileLike,
  List,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Write a slice of chunks.
 *
 * The eof code (`null`) can be used to signal end of stream.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode List}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {Chunk | FileLike | List<Chunk | FileLike | Value> | Value} slice
 *  The chunk or chunks to write
 * @return {Event[]}
 *  List of events
 */
type Write = (
  this: void,
  slice: Chunk | FileLike | List<Chunk | FileLike | Value> | Value
) => Event[]

export type { Write as default }

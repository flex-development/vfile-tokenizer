/**
 * @file Type Aliases - Write
 * @module fsm-tokenizer/types/Write
 */

import type {
  Chunk,
  Event,
  List,
  Value
} from '@flex-development/fsm-tokenizer'

/**
 * Write a slice of chunks.
 *
 * The eof code (`null`) can be used to signal end of stream.
 *
 * > 👉 **Note**: Chunks that are not character codes or buffer chunks (arrays
 * > containing numeric character codes) will be converted to such using the
 * > specified character code preprocessor, or the default preprocessor if one
 * > is not specified.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode Event}
 * @see {@linkcode List}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {Chunk | List<Chunk | Value> | Value} slice
 *  The chunk, value, or list of chunks and/or values to write
 * @return {Event[]}
 *  List of events
 */
type Write = (
  this: void,
  slice: Chunk | List<Chunk | Value> | Value
) => Event[]

export type { Write as default }

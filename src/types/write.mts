/**
 * @file Type Aliases - Write
 * @module vfile-tokenizer/types/Write
 */

import type { Chunk, Event } from '@flex-development/vfile-tokenizer'

/**
 * Write a slice of chunks.
 *
 * The eof code (`null`) can be used to signal end of stream.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode Event}
 *
 * @this {void}
 *
 * @param {Chunk[]} slice
 *  The chunks to write
 * @return {Event[]}
 *  List of events
 */
type Write = (this: void, slice: Chunk[]) => Event[]

export type { Write as default }

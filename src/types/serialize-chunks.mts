/**
 * @file Type Aliases - SerializeChunks
 * @module fsm-tokenizer/types/SerializeChunks
 */

import type { Chunk, SerializeOptions } from '@flex-development/fsm-tokenizer'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode SerializeOptions}
 *
 * @this {void}
 *
 * @param {(Chunk | string)[]} chunks
 *  The chunks to serialize
 * @param {SerializeOptions | boolean | null | undefined} [options]
 *  Options for serializing or whether to expand tabs
 * @return {string}
 *  String value of `chunks`
 */
type SerializeChunks = (
  this: void,
  chunks: (Chunk | string)[],
  options?: SerializeOptions | boolean | null | undefined
) => string

export type { SerializeChunks as default }

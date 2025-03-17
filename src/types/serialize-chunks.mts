/**
 * @file Type Aliases - SerializeChunks
 * @module vfile-tokenizer/types/SerializeChunks
 */

import type { Chunk } from '@flex-development/vfile-tokenizer'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 *
 * @this {void}
 *
 * @param {(Chunk | string)[]} chunks
 *  The chunks to serialize
 * @param {boolean | null | undefined} [expandTabs]
 *  Whether to expand tabs
 * @return {string}
 *  String value of `chunks`
 */
type SerializeChunks = (
  this: void,
  chunks: (Chunk | string)[],
  expandTabs?: boolean | null | undefined
) => string

export type { SerializeChunks as default }

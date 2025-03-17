/**
 * @file Utilities - sliceSerialize
 * @module vfile-tokenizer/utils/sliceSerialize
 */

import serializeChunks from '#utils/serialize-chunks'
import sliceChunks from '#utils/slice-chunks'
import type { Chunk, List, Position } from '@flex-development/vfile-tokenizer'

/**
 * Get the text spanning `range`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode List}
 * @see {@linkcode Position}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {List<Chunk | string>} chunks
 *  List of chunks
 * @param {Position | null | undefined} [range]
 *  Position in stream
 * @param {boolean | null | undefined} [expandTabs]
 *  Whether to expand tabs
 * @return {string}
 *  Serialized slice
 */
function sliceSerialize(
  this: void,
  chunks: List<Chunk | string>,
  range?: Position | null | undefined,
  expandTabs?: boolean | null | undefined
): string {
  return serializeChunks(sliceChunks(chunks, range), expandTabs)
}

export default sliceSerialize

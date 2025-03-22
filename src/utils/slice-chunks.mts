/**
 * @file Utilities - sliceChunks
 * @module vfile-tokenizer/utils/sliceChunks
 */

import size from '#internal/size'
import sliceable from '#internal/sliceable'
import type { Chunk, List, Range } from '@flex-development/vfile-tokenizer'
import { ok } from 'devlop'

export default sliceChunks

/**
 * Get the chunks spanning `range`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode List}
 * @see {@linkcode Range}
 *
 * @category
 *  utils
 *
 * @template {Chunk | string} T
 *  Chunk type
 *
 * @this {void}
 *
 * @param {List<T>} chunks
 *  List of chunks
 * @param {Range} range
 *  Position in stream
 * @return {T[]}
 *  List of chunks spanning `range`
 */
function sliceChunks<T extends Chunk | string>(
  this: void,
  chunks: List<T>,
  range: Range
): T[] {
  /**
   * Slice of chunks.
   *
   * @var {T[]} slice
   */
  let slice: T[] = []

  if (size(chunks)) {
    const { _bufferIndex: endBufferIndex, _index: endIndex } = range.end
    const { _bufferIndex: startBufferIndex, _index: startIndex } = range.start

    /**
     * List of chunks.
     *
     * @const {T[]} list
     */
    const list: T[] = [...chunks]

    if (startIndex === endIndex && startBufferIndex > 0 && endBufferIndex > 0) {
      ok(sliceable(list[startIndex]), 'expected buffer chunk')
      slice = [list[startIndex].slice(startBufferIndex, endBufferIndex) as T]
    } else {
      slice = list.slice(startIndex, endIndex)

      if (startBufferIndex > -1) {
        /**
         * First chunk in slice.
         *
         * @const {T | undefined} head
         */
        const head: T | undefined = slice.shift()

        if (sliceable(head)) slice.unshift(head.slice(startBufferIndex) as T)
      }

      if (endBufferIndex > 0) {
        ok(sliceable(list[endIndex]), 'expected buffer chunk')
        slice.push(list[endIndex].slice(0, endBufferIndex) as T)
      }
    }
  }

  return slice
}

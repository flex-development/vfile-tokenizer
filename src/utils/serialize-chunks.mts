/**
 * @file Utilities - serializeChunks
 * @module vfile-tokenizer/utils/serializeChunks
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import type { Chunk } from '@flex-development/vfile-tokenizer'
import { ok } from 'devlop'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {Chunk[]} chunks
 *  The chunks to serialize
 * @param {boolean | null | undefined} [expandTabs]
 *  Whether to expand tabs
 * @return {string}
 *  String value of `chunks`
 */
function serializeChunks(
  this: void,
  chunks: Chunk[],
  expandTabs?: boolean | null | undefined
): string {
  /**
   * Serialized character codes.
   *
   * @const {string[]} result
   */
  const result: string[] = []

  /**
   * Index of current chunk.
   *
   * @var {number} index
   */
  let index: number = -1

  /**
   * Whether the current character code represents a horizontal tab.
   *
   * @var {boolean} tab
   */
  let tab: boolean = false

  while (++index < chunks.length) {
    /**
     * Current chunk.
     *
     * @const {Chunk} chunk
     */
    const chunk: Chunk = chunks[index] as Chunk

    /**
     * Serialized chunk.
     *
     * @var {string} value
     */
    let value: string

    if (typeof chunk === 'string') {
      value = chunk
    } else {
      switch (chunk) {
        case codes.crlf:
          value = chars.crlf
          break
        case codes.vcr:
          value = chars.cr
          break
        case codes.vht:
          value = expandTabs ? chars.space : chars.ht
          break
        case codes.vlf:
          value = chars.lf
          break
        case codes.vs:
          if (!expandTabs && tab) continue
          value = chars.space
          break
        default:
          ok(typeof chunk === 'number', 'expected code point')
          ok(chunk !== codes.break, 'expected valid code point')
          value = String.fromCodePoint(chunk)
      }
    }

    tab = chunk === codes.vht
    result.push(value)
  }

  return result.join(chars.empty)
}

export default serializeChunks

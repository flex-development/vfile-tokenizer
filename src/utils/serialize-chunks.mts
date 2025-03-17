/**
 * @file Utilities - serializeChunks
 * @module vfile-tokenizer/utils/serializeChunks
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import size from '#internal/size'
import type { Chunk, List } from '@flex-development/vfile-tokenizer'
import { ok } from 'devlop'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode List}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {List<Chunk | string>} chunks
 *  The chunks to serialize
 * @param {boolean | null | undefined} [expandTabs]
 *  Whether to expand tabs
 * @return {string}
 *  String value of `chunks`
 */
function serializeChunks(
  this: void,
  chunks: List<Chunk | string>,
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

  while (++index < size(chunks)) {
    /**
     * Current chunk.
     *
     * @const {Chunk} chunk
     */
    const chunk: Chunk | string = [...chunks][index] as Chunk | string

    /**
     * Serialized chunk.
     *
     * @var {string} value
     */
    let value: string

    if (Array.isArray(chunk)) {
      value = serializeChunks(chunk, expandTabs)
    } else if (typeof chunk === 'string') {
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

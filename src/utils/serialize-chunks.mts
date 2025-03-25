/**
 * @file Utilities - serializeChunks
 * @module fsm-tokenizer/utils/serializeChunks
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import nil from '#internal/nil'
import size from '#internal/size'
import type {
  Chunk,
  List,
  SerializeOptions
} from '@flex-development/fsm-tokenizer'
import { ok } from 'devlop'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode List}
 * @see {@linkcode SerializeOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {List<Chunk | string>} chunks
 *  The chunks to serialize
 * @param {SerializeOptions | boolean | null | undefined} [options]
 *  Options for serializing or whether to expand tabs
 * @return {string}
 *  String value of `chunks`
 */
function serializeChunks(
  this: void,
  chunks: List<Chunk | string>,
  options?: SerializeOptions | boolean | null | undefined
): string {
  if (typeof options === 'boolean' || !options) {
    options = { expandTabs: options }
  }

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
     * @const {Chunk | string | undefined} chunk
     */
    const chunk: Chunk | string | undefined = [...chunks][index]

    /**
     * Serialized chunk.
     *
     * @var {string} value
     */
    let value: string

    ok(typeof chunk !== 'undefined', 'expected `chunk`')

    if (Array.isArray(chunk)) {
      value = serializeChunks(chunk, options)
    } else if (typeof chunk === 'string') {
      value = chunk
    } else {
      switch (true) {
        case chunk === codes.break && !nil(options.breaks):
          value = options.breaks ? chars.space : chars.empty
          if (typeof options.breaks === 'string') value = options.breaks
          break
        case chunk === codes.crlf:
          value = chars.crlf
          break
        case chunk === codes.empty:
          value = chars.empty
          break
        case chunk === codes.vcr:
          value = chars.cr
          break
        case chunk === codes.vht:
          value = options.expandTabs ? chars.space : chars.ht
          break
        case chunk === codes.vlf:
          value = chars.lf
          break
        case chunk === codes.vs:
          if (!options.expandTabs && tab) continue
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

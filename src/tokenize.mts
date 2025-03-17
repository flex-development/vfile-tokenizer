/**
 * @file tokenize
 * @module vfile-tokenizer/tokenize
 */

import createTokenizer from '#create-tokenizer'
import codes from '#enums/codes'
import toList from '#internal/to-list'
import type {
  Event,
  FileLike,
  List,
  Options,
  TokenizeContext,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode List}
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {FileLike | List<FileLike | Value> | Value | null | undefined} value
 *  The file, value, or list of files and/or values to tokenize
 * @param {Options | TokenizeContext} options
 *  Configuration options or the tokenizer to use
 * @return {Event[]}
 *  List of events
 */
function tokenize(
  this: void,
  value: FileLike | List<FileLike | Value> | Value | null | undefined,
  options: Options | TokenizeContext
): Event[] {
  /**
   * Tokenize context.
   *
   * @var {TokenizeContext} context
   */
  let context: TokenizeContext = options as TokenizeContext

  // create tokenizer.
  if (!('write' in options)) context = createTokenizer(options)

  // write chunks to stream.
  if (value !== null && value !== undefined) {
    for (const chunk of [...toList(value), codes.eof]) context.write(chunk)
  }

  return [...context.events]
}

export default tokenize

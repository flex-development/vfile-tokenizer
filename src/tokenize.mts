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
  TokenizeContext,
  TokenizeOptions,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode List}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {FileLike | List<FileLike | Value> | Value | null | undefined} value
 *  The file, value, or list of files and/or values to tokenize
 * @param {TokenizeOptions} options
 *  Configuration options
 * @return {Event[]}
 *  List of events
 */
function tokenize(
  this: void,
  value: FileLike | List<FileLike | Value> | Value | null | undefined,
  options: TokenizeOptions
): Event[] {
  /**
   * Tokenize context.
   *
   * @const {TokenizeContext} context
   */
  const context: TokenizeContext = options.tokenizer ?? createTokenizer(options)

  if (value !== null && value !== undefined) {
    /**
     * The chunks to write.
     *
     * @const {(FileLike | Value)[]}
     */
    const chunks: (FileLike | Value)[] = [...toList(value)]

    if (chunks.length) {
      for (const [i, chunk] of chunks.entries()) {
        context.chunk = i

        // write `chunk` to stream.
        context.write(chunk)

        // end stream or write stream break to separate chunks.
        if (i === chunks.length - 1) context.write(codes.eof)
        else if (options.break) context.write(codes.break)
      }

      context.chunk = null
    }
  }

  return [...context.events]
}

export default tokenize

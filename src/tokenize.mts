/**
 * @file tokenize
 * @module fsm-tokenizer/tokenize
 */

import codes from '#enums/codes'
import isList from '#internal/is-list'
import size from '#internal/size'
import toTokenizer from '#internal/to-tokenizer'
import type {
  Chunk,
  Code,
  Event,
  FileLike,
  List,
  TokenizeContext,
  TokenizeOptions,
  Value
} from '@flex-development/fsm-tokenizer'
import { ok } from 'devlop'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode List}
 * @see {@linkcode TokenizeContext}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {FileLike | List<FileLike | Value> | Value | null | undefined} value
 *  The file, value, or list of files and/or values to tokenize
 * @param {TokenizeContext | TokenizeOptions} options
 *  Configuration options or the tokenizer to use
 * @return {Event[]}
 *  List of events
 */
function tokenize(
  this: void,
  value: FileLike | List<FileLike | Value> | Value | null | undefined,
  options: TokenizeContext | TokenizeOptions
): Event[] {
  /**
   * Tokenize context.
   *
   * @const {TokenizeContext} context
   */
  const context: TokenizeContext = toTokenizer(options)

  // write chunks to stream.
  if (
    value === null ||
    value === undefined ||
    isList(value) && !size(value)
  ) {
    context.write(codes.eof)
  } else if (!isList(value)) {
    /**
     * The chunks to write.
     *
     * @const {Code[]} slice
     */
    const slice: Code[] = context.preprocess(value, options.encoding, true)

    if (slice.length === 1) { // empty value.
      ok(slice[0] === codes.eof, 'expected eof code')
      slice.unshift(codes.empty)
    }

    context.write(slice)
  } else {
    context.breaks = options.breaks

    for (const [i, chunk] of [...value].entries()) {
      /**
       * Whether this is the end of the stream.
       *
       * @const {boolean} end
       */
      const end: boolean = i === size(value) - 1

      /**
       * The values to write.
       *
       * @var {(Chunk | Value)[]} slice
       */
      let slice: (Chunk | Value)[] = []

      if (typeof chunk === 'object' && 'value' in chunk) {
        slice.push(chunk.value)
      } else {
        slice.push(chunk)
      }

      if (context.breaks && !end) slice.push(codes.break)
      if (end) slice.push(codes.eos)

      context.write(slice)
    }
  }

  return context.events
}

export default tokenize

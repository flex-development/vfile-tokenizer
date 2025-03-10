/**
 * @file tokenize
 * @module vfile-tokenizer/tokenize
 */

import tokenizer from '#create-tokenizer'
import preprocess from '#preprocess'
import type {
  Event,
  FileLike,
  TokenizeOptions,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Tokenize `value`.
 *
 * @see {@linkcode Event}
 * @see {@linkcode FileLike}
 * @see {@linkcode TokenizeOptions}
 * @see {@linkcode Value}
 *
 * @this {void}
 *
 * @param {FileLike | Value | null | undefined} value
 *  File or value
 * @param {TokenizeOptions} options
 *  Configuration options
 * @return {Event[]}
 *  List of events
 */
function tokenize(
  this: void,
  value: FileLike | Value | null | undefined,
  options: TokenizeOptions
): Event[] {
  return tokenizer(options).write(preprocess(options)(
    value,
    options.encoding,
    true
  ))
}

export default tokenize

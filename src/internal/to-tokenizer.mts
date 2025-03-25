/**
 * @file Internal - toTokenizer
 * @module fsm-tokenizer/internal/toTokenizer
 */

import createTokenizer from '#create-tokenizer'
import type {
  TokenizeContext,
  TokenizeOptions
} from '@flex-development/fsm-tokenizer'

/**
 * Convert `value` to a tokenizer if it is not one already.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {TokenizeContext | TokenizeOptions} value
 *  Configuration options or the tokenizer to use
 * @return {TokenizeContext}
 *  Tokenize context object
 */
function toTokenizer(
  this: void,
  value: TokenizeContext | TokenizeOptions
): TokenizeContext {
  return 'write' in value ? value : createTokenizer(value)
}

export default toTokenizer

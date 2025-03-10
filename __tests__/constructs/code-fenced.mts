/**
 * @file Constructs - codeFenced
 * @module tests/constructs/codeFenced
 */

import { codes } from '#enums/index'
import type {
  Code,
  Construct,
  TokenizeContext,
  Tokenizer
} from '@flex-development/vfile-tokenizer'
import * as micromark from 'micromark-core-commonmark'

/**
 * Fenced code construct.
 *
 * @const {Construct} codeFenced
 */
const codeFenced: Construct = {
  name: micromark.codeFenced.name,
  test,
  tokenize: micromark.codeFenced.tokenize as unknown as Tokenizer
}

export default codeFenced

/**
 * Check if the current character `code` can start this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  Current character code
 * @return {boolean}
 *  `true` if `code` can start construct, `false` otherwise
 */
function test(this: TokenizeContext, code: Code): boolean {
  return code === codes.graveAccent || code === codes.tilde
}

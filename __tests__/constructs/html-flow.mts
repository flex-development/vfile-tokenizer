/**
 * @file Constructs - htmlFlow
 * @module tests/constructs/htmlFlow
 */

import { codes } from '#enums/index'
import type {
  Code,
  Construct,
  Resolver,
  TokenizeContext,
  Tokenizer
} from '@flex-development/vfile-tokenizer'
import * as micromark from 'micromark-core-commonmark'

/**
 * HTML flow construct.
 *
 * @const {Construct} htmlFlow
 */
const htmlFlow: Construct = {
  name: micromark.htmlFlow.name,
  resolveTo: micromark.htmlFlow.resolveTo as unknown as Resolver,
  test,
  tokenize: micromark.htmlFlow.tokenize as unknown as Tokenizer
}

export default htmlFlow

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
  return code === codes.lt
}

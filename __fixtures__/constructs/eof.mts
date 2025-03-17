/**
 * @file Constructs - eof
 * @module fixtures/constructs/eof
 */

import codes from '#enums/codes'
import tt from '#fixtures/tt'
import type {
  Code,
  Construct,
  Effects,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import { ok as assert } from 'devlop'

/**
 * End-of-file construct.
 *
 * @const {Construct} eof
 */
const eof: Construct = {
  name: tt.eof,
  test: testEOF,
  tokenize: tokenizeEOF
}

export default eof

/**
 * Check if the current character `code` can start the end of file construct.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The current character code
 * @return {boolean}
 *  `true` if `code` can start construct
 */
function testEOF(this: TokenizeContext, code: Code): boolean {
  return code === codes.eof
}

/**
 * Tokenize the end of file.
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  Context object to transition state machine
 * @param {State} ok
 *  Successful tokenization state
 * @return {State}
 *  Initial state
 */
function tokenizeEOF(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return eof

  /**
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function eof(this: void, code: Code): State | undefined {
    assert(code === codes.eof, 'expected eof code')
    effects.enter(tt.eof)
    effects.consume(code)
    effects.exit(tt.eof)
    return ok
  }
}

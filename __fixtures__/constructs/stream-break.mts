/**
 * @file Constructs - streamBreak
 * @module fixtures/constructs/streamBreak
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
 * Stream break construct.
 *
 * @const {Construct} streamBreak
 */
const streamBreak: Construct = {
  name: tt.break,
  test: testStreamBreak,
  tokenize: tokenizeStreamBreak
}

export default streamBreak

/**
 * Check if the current character `code` represents a stream break.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The current character code
 * @return {boolean}
 *  `true` if `code` represents stream break, `false` otherwise
 */
function testStreamBreak(this: TokenizeContext, code: Code): boolean {
  return code === codes.break
}

/**
 * Tokenize a stream break.
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
function tokenizeStreamBreak(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return end

  /**
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function end(this: void, code: Code): State | undefined {
    assert(code === codes.break, 'expected stream break code')
    effects.enter(tt.break)
    effects.consume(code)
    effects.exit(tt.break)
    return ok
  }
}

/**
 * @file Constructs - eos
 * @module fixtures/constructs/eos
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

/**
 * End-of-stream construct.
 *
 * @const {Construct} end
 */
const end: Construct = {
  name: tt.end,
  tokenize: tokenizeEnd
}

export default end

/**
 * Tokenize the end of stream.
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  Context object to transition state machine
 * @param {State} ok
 *  Successful tokenization state
 * @param {State} nok
 *  Failed tokenization state
 * @return {State}
 *  Initial state
 */
function tokenizeEnd(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
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
    if (code !== codes.eos) return nok(code)
    effects.enter(tt.end)
    effects.consume(code)
    effects.exit(tt.end)
    return ok
  }
}

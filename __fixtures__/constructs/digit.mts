/**
 * @file Constructs - digit
 * @module fixtures/constructs/digit
 */

import ev from '#enums/ev'
import tt from '#fixtures/tt'
import type {
  Code,
  Construct,
  Effects,
  Event,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import { ok as assert } from 'devlop'
import { asciiDigit } from 'micromark-util-character'

/**
 * Digit construct.
 *
 * @const {Construct} digit
 */
const digit: Construct = {
  name: tt.digit,
  resolve: resolveDigit,
  tokenize: tokenizeDigit
}

export default digit

/**
 * Resolve the events parsed by {@linkcode tokenizeDigit}.
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @param {TokenizeContext} context
 *  Tokenize context
 * @return {Event[]}
 *  List of changed events
 */
function resolveDigit(
  this: void,
  events: Event[],
  context: TokenizeContext
): Event[] {
  /**
   * Index of current event.
   *
   * @var {number} index
   */
  let index: number = -1

  while (++index < events.length) {
    assert(events[index], 'expected event')
    const [event, token] = events[index]!

    assert(token.type === tt.digit, 'expected digit token')
    assert(event === ev.enter, 'expected digit enter event')

    token.value = context.sliceSerialize(token)
    index++
  }

  return events
}

/**
 * Tokenize a digit.
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
function tokenizeDigit(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return digit

  /**
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function digit(this: void, code: Code): State | undefined {
    if (!asciiDigit(code)) return nok(code)
    effects.enter(tt.digit)
    effects.consume(code)
    effects.exit(tt.digit)
    return ok
  }
}

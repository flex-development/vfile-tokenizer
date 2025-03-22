/**
 * @file Constructs - letter
 * @module fixtures/constructs/letter
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
import { asciiAlpha } from 'micromark-util-character'

/**
 * Letter construct.
 *
 * @const {Construct} letter
 */
const letter: Construct = {
  name: tt.letter,
  resolveAll: resolveAllLetter,
  tokenize: tokenizeLetter
}

export default letter

/**
 * Resolve all events when the content is complete, from the start to the end.
 *
 * > 👉 **Note**: Only used if {@linkcode tokenizeLetter} is successful at
 * > least once.
 *
 * @this {void}
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
function resolveAllLetter(
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

    if (event === ev.enter && token.type === tt.letter) {
      token.value = context.sliceSerialize(token)
      index++
    }
  }

  return events
}

/**
 * Tokenize a letter.
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
function tokenizeLetter(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return letter

  /**
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function letter(this: void, code: Code): State | undefined {
    if (!asciiAlpha(code)) return nok(code)
    effects.enter(tt.letter)
    effects.consume(code)
    effects.exit(tt.letter)
    return ok
  }
}

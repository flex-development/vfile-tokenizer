/**
 * @file Constructs - eof
 * @module tests/constructs/eof
 */

import { codes, ev } from '#enums/index'
import tt from '#fixtures/tt'
import type {
  Code,
  Construct,
  Effects,
  Event,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'

/**
 * End of file construct.
 *
 * @const {Construct} eof
 */
const eof: Construct = {
  name: tt.eof,
  previous,
  resolveAll,
  tokenize
}

export default eof

/**
 * Check if the previous character `code` can before this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  Current character code
 * @return {boolean}
 *  `true` if `code` can come before construct, `false` otherwise
 */
function previous(this: TokenizeContext, code: Code): boolean {
  return typeof code === 'number'
}

/**
 * Resolve all events when the content is complete, from the start to the end.
 *
 * > 👉 **Note**: Only used if {@linkcode tokenize} is successful once.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
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
function resolveAll(events: Event[], context: TokenizeContext): Event[] {
  for (const [event, token] of events) {
    if (event === ev.enter && token.type !== tt.eof) {
      token.value = context.sliceSerialize(token)
    }
  }

  return events
}

/**
 * Set up a state machine to handle character codes streaming in.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
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
function tokenize(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return eof

  /**
   * Tokenize end of file.
   *
   * @this {void}
   *
   * @param {Code} code
   *  Current character code
   * @return {State | undefined}
   *  Next state
   */
  function eof(this: void, code: Code): State | undefined {
    if (code !== codes.eof) return nok(code)
    effects.enter(tt.eof)
    effects.consume(code)
    effects.exit(tt.eof)
    return ok
  }
}

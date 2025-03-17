/**
 * @file Constructs - lineEnding
 * @module fixtures/constructs/lineEnding
 */

import ev from '#enums/ev'
import tt from '#fixtures/tt'
import eol from '#utils/eol'
import type {
  Code,
  Construct,
  Effects,
  Event,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import { ok as assert } from 'devlop'
import * as micromark from 'micromark-core-commonmark'

/**
 * Line ending construct.
 *
 * @const {Construct} lineEnding
 */
const lineEnding: Construct = {
  name: micromark.lineEnding.name,
  resolve: resolveLineEnding,
  test: eol,

  // @ts-expect-error [2332] micromark tokenizers have custom fields, which
  // users are supposed to manually type.
  tokenize: micromark.lineEnding.tokenize
}

export default lineEnding

declare module '@flex-development/vfile-tokenizer' {
  interface TokenInfo {
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    lineEnding: tt.lineEnding
  }
}

/**
 * Resolve the events parsed by {@linkcode tokenizeLineEnding}.
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
function resolveLineEnding(
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

    if (token.type === tt.lineEnding) {
      assert(event === ev.enter, 'expected line ending enter event')
      token.value = JSON.stringify(context.sliceSerialize(token)).slice(1, -1)
      index++
    }
  }

  return events
}

/**
 * Tokenize a line ending.
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
function tokenizeLineEnding(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return lineEnding

  /**
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function lineEnding(this: void, code: Code): State | undefined {
    assert(eol(code), 'expected line ending code')

    effects.enter(tt.lineEnding)
    effects.consume(code)
    effects.exit(tt.lineEnding)
    return ok
  }
}

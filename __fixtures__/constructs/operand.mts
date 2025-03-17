/**
 * @file Constructs - operand
 * @module fixtures/constructs/operand
 */

import codes from '#enums/codes'
import ev from '#enums/ev'
import tt from '#fixtures/tt'
import isBreak from '#tests/utils/is-break'
import type {
  Code,
  Construct,
  Effects,
  Event,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import { ok as assert } from 'devlop'

/**
 * Operand construct.
 *
 * The `value` of a token produced by this construct is either a subcommand
 * name, a command-argument, or an option-argument.
 *
 * @const {Construct} operand
 */
const operand: Construct = {
  partial: true,
  previous: previousOperand,
  resolveAll: resolveAllOperand,
  tokenize: tokenizeOperand
}

export default operand

/**
 * Check if the previous character `code` can come before an operand.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The previous character code
 * @return {boolean}
 *  `true` if `code` can come before operand construct
 */
function previousOperand(this: TokenizeContext, code: Code): boolean {
  if (isBreak(code)) return true

  /**
   * Possible flag exit event.
   *
   * @const {Event | undefined} event
   */
  const event: Event | undefined = this.events.at(-1)

  return !!event && event[0] === ev.exit && event[1].type === tt.flag
}

/**
 * Resolve all events when the content is complete, from the start to the end.
 *
 * > 👉 **Note**: Only used if {@linkcode tokenizeOperand} is successful at
 * > least once.
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
function resolveAllOperand(
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
    assert(events[index], 'expected `events[index]`')
    const [event, token] = events[index]!

    if (token.type === tt.operand) {
      assert(event === ev.enter, 'expected operand enter event')
      token.value = context.sliceSerialize(token)
      index++
    }
  }

  return events
}

/**
 * Tokenize an operand.
 *
 * @example
 *  ```markdown
 *  > | info
 *  ```
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
function tokenizeOperand(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * Tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  return operand

  /**
   * Start of an operand.
   *
   * @example
   *  ```markdown
   *  > | info
   *      ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function operand(this: void, code: Code): State | undefined {
    effects.enter(tt.operand, { attached: self.previous === codes.equal })
    return (isBreak(code) ? nok : inside)(code)
  }

  /**
   * Inside operand.
   *
   * @example
   *  ```markdown
   *  > | info
   *      ^^^^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function inside(this: void, code: Code): State | undefined {
    if (!isBreak(code)) return effects.consume(code), inside
    return effects.exit(tt.operand), ok(code)
  }
}

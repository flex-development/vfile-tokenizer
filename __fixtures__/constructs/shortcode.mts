/**
 * @file Constructs - shortcode
 * @module fixtures/constructs/shortcode
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
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
import { nameToEmoji } from 'gemoji'
import { asciiAlphanumeric } from 'micromark-util-character'

/**
 * Gemoji (`:+1:`) construct.
 *
 * @const {Construct} shortcode
 */
const shortcode: Construct = {
  name: 'gemoji',
  previous: previousShortcode,
  resolve: resolveShortcode,
  tokenize: tokenizeShortcode
}

export default shortcode

/**
 * Check if the previous character `code` can before a shortcode.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The previous character code
 * @return {boolean}
 *  `true` if `code` can come before construct, `false` otherwise
 */
function previousShortcode(this: TokenizeContext, code: Code): boolean {
  assert(code === this.previous, 'expected previous code')
  return code !== codes.backslash && code !== codes.colon
}

/**
 * Resolve the events parsed by {@linkcode tokenizeShortcode}.
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
function resolveShortcode(
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

    if (event === ev.enter) {
      if (token.type !== tt.shortcode) {
        assert(token.type !== tt.id, 'expected no shortcode id token')
        token.value = token.value ?? context.sliceSerialize(token)
        continue
      }

      /**
       * Next set of events.
       *
       * @const {Event[]} next
       */
      const next: Event[] = events.splice(index + 1, 2)

      assert(next[0], 'expected shortcode id event')
      assert(next[0][0] === ev.enter, 'expected shortcode id enter event')
      assert(next[0][1].type === tt.id, 'expected shortcode id token')
      const [, name] = next[0]

      name.value = context.sliceSerialize(name)
      assert(name.value, 'expected non-empty shortcode id token value')

      token.emoji = nameToEmoji[name.value]
      token.value = chars.colon + name.value + chars.colon
    }
  }

  return events
}

/**
 * Tokenize a shortcode.
 *
 * @example
 *  ```markdown
 *  > | :building_construction:
 *  ```
 *
 * @example
 *  ```markdown
 *  > | :package:
 *  ```
 *
 * @example
 *  ```markdown
 *  > | :+1:
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
function tokenizeShortcode(
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

  return shortcode

  /**
   * Start of a shortcode.
   *
   * @example
   *  ```markdown
   *  > | :+1:
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
  function shortcode(this: void, code: Code): State | undefined {
    assert(code === codes.colon, 'expected `:`')
    return effects.enter(tt.shortcode), effects.consume(code), before
  }

  /**
   * After first marker, before id.
   *
   * @example
   *  ```markdown
   *  > | :building_construction:
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | :package:
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | :+1:
   *       ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function before(this: void, code: Code): State | undefined {
    return effects.enter(tt.id), inside(code)
  }

  /**
   * Inside shortcode id.
   *
   * @example
   *  ```markdown
   *  > | :building_construction:
   *       ^^^^^^^^^^^^^^^^^^^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | :package:
   *       ^^^^^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | :+1:
   *       ^^
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
    switch (true) {
      case code === codes.colon && self.previous !== code:
        effects.exit(tt.id)
        effects.consume(code)
        effects.exit(tt.shortcode)
        return ok
      case asciiAlphanumeric(code):
      case code === codes.break:
      case code === codes.minus:
      case code === codes.plus:
      case code === codes.underscore:
        return effects.consume(code), inside
      default:
        break
    }

    return nok(code)
  }
}

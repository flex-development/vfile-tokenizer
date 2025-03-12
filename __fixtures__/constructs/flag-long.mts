/**
 * @file Constructs - longFlag
 * @module fixtures/constructs/longFlag
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import ev from '#enums/ev'
import operand from '#fixtures/constructs/operand'
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
import { asciiAlphanumeric } from 'micromark-util-character'

/**
 * Long flag construct.
 *
 * A long flag starts with two hyphens ([HYPHEN-MINUS `U+002D`][hyphen])
 * followed by one or more case-insensitive alphanumeric characters.
 *
 * Hyphens and full stops ([FULL STOP `U+002E`][full-stop]) can be used to
 * separate words, as well as camelCase format.
 *
 * [full-stop]: https://www.fileformat.info/info/unicode/char/002e/index.htm
 * [hyphen]: https://www.fileformat.info/info/unicode/char/002d/index.htm
 * [lowline]: https://www.fileformat.info/info/unicode/char/005f/index.htm
 *
 * @const {Construct} longFlag
 */
const longFlag: Construct = {
  name: 'longFlag',
  previous: isBreak,
  resolveTo: resolveToLongFlag,
  test: testLongFlag,
  tokenize: tokenizeLongFlag
}

export default longFlag

declare module '@flex-development/vfile-tokenizer' {
  interface TokenInfo {
    value?: string | null | undefined
  }

  interface TokenFields {
    chunk?: number | null | undefined
    long?: boolean | null | undefined
  }

  interface TokenTypeMap {
    flag: tt.flag
    flagId: tt.id
  }

  interface TokenizeContext {
    delimiter?: boolean | null | undefined
  }
}

/**
 * Resolve the events parsed from the start of the content (which may include
 * other constructs) to the last one parsed by {@linkcode tokenizeLongFlag}.
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
function resolveToLongFlag(
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

    // merge flag id events into flag events.
    if (event === ev.enter && token.type === tt.flag) {
      assert(token.long, 'expected long flag')

      /**
       * Next event.
       *
       * @const {Event | undefined} next
       */
      const next: Event | undefined = events[index + 1]

      if (next && next[0] === ev.enter && next[1].type === tt.id) {
        events.splice(index + 1, 2)
        const [, id] = next

        // capture option flag id.
        id.value = context.sliceSerialize(id)
        assert(id.value, 'expected non-empty flag id token value')

        // set option flag.
        token.value = chars.hyphen + chars.hyphen + id.value
      }
    }
  }

  return events
}

/**
 * Check if the current character `code` can start a long flag.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The current character code
 * @return {boolean}
 *  `true` if `code` can start long flag construct
 */
function testLongFlag(this: TokenizeContext, code: Code): boolean {
  return !this.delimiter && code === codes.hyphen
}

/**
 * Tokenize a long flag.
 *
 * @example
 *  ```markdown
 *  > | --long
 *  ```
 *
 * @example
 *  ```markdown
 *  > | --long.flag
 *  ```
 *
 * @example
 *  ```markdown
 *  > | --long-flag
 *  ```
 *
 * @example
 *  ```markdown
 *  > | --long=value
 *  ```
 *
 * @example
 *  ```markdown
 *  > | --long.flag=value
 *  ```
 *
 * @example
 *  ```markdown
 *  > | --long-flag=value
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
function tokenizeLongFlag(
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

  return longFlag

  /**
   * Start of a long flag.
   *
   * @example
   *  ```markdown
   *  > | --long-flag
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
  function longFlag(this: void, code: Code): State | undefined {
    assert(code === codes.hyphen, 'expected `-`')
    effects.enter(tt.flag, { chunk: self.chunk, long: true })
    effects.consume(code)
    return after
  }

  /**
   * After first long flag marker.
   *
   * @example
   *  ```markdown
   *  > | --long-flag
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
  function after(this: void, code: Code): State | undefined {
    if (code !== codes.hyphen) return nok(code)
    return effects.consume(code), beforeId
  }

  /**
   * Before long flag id.
   *
   * @example
   *  ```markdown
   *  > | --long-flag
   *        ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function beforeId(this: void, code: Code): State | undefined {
    if (!asciiAlphanumeric(code) && code !== codes.hyphen) return nok(code)
    return effects.enter(tt.id, { chunk: self.chunk }), id(code)
  }

  /**
   * Inside long flag id.
   *
   * @example
   *  ```markdown
   *  > | --long-flag
   *        ^^^^^^^^^
   *  ```
   * @example
   *  ```markdown
   *  > | --long.flag
   *        ^^^^^^^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | --long-flag=value
   *        ^^^^^^^^^
   *  ```
   * @example
   *  ```markdown
   *  > | --long.flag=value
   *        ^^^^^^^^^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  Next state
   */
  function id(this: void, code: Code): State | undefined {
    switch (true) {
      case asciiAlphanumeric(code):
      case code === codes.dot:
      case code === codes.hyphen:
        return effects.consume(code), id
      case code === codes.equal:
        effects.exit(tt.id)
        effects.exit(tt.flag)
        effects.consume(code)
        return effects.attempt(operand, ok, ok)
      case isBreak(code):
        /**
         * Flag id codes.
         *
         * @const {Code[]} flagId
         */
        const flagId: Code[] = self.sliceStream(effects.exit(tt.id))

        // ensure flag is not actually a delimiter.
        if (flagId.length === 1 && flagId[0] === codes.hyphen) break
        return effects.exit(tt.flag), ok(code)
      default:
        break
    }

    return nok(code)
  }
}

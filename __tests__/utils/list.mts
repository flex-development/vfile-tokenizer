/**
 * @file Test Utilities - list
 * @module tests/utils/list
 */

import { ev } from '#enums/index'
import type { Event, Token } from '@flex-development/vfile-tokenizer'

/**
 * Convert a list of events or linked token list to a flat token list.
 *
 * @see {@linkcode Event}
 *
 * @template {Event[] | Token} T
 *  Event list or head token
 *
 * @this {void}
 *
 * @param {Event[] | Token | undefined} data
 *  Event list or head token
 * @return {Token[]}
 *  Flat token list
 */
function list<T extends Event[] | Token>(
  this: void,
  data: T | undefined
): Token[] {
  /**
   * Flat token list.
   *
   * @const {Token[]} tokens
   */
  const tokens: Token[] = []

  if (Array.isArray<Event>(data)) {
    for (const [event, token] of data) {
      if (event === ev.enter) tokens.push(token)
    }
  } else {
    /**
     * Current token.
     *
     * @var {Token | undefined} token
     */
    let token: Token | undefined = data

    while (token) void (tokens.push(token), token = token.next)
  }

  return tokens
}

export default list

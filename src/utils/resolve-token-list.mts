/**
 * @file Utilities - resolveTokenList
 * @module vfile-tokenizer/utils/resolveTokenList
 */

import { ev } from '#enums/index'
import type {
  Event,
  Token,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import { ok } from 'devlop'

/**
 * Resolve a linked token list.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @template {Event[] | ReadonlyArray<Event>} T
 *  List of events
 *
 * @param {T} events
 *  List of events
 * @return {T}
 *  List of changed events
 */
function resolveTokenList<T extends Event[] | readonly Event[]>(
  this: void,
  events: T
): T {
  if (events.length) {
    /**
     * Head token.
     *
     * @const {Token | undefined} head
     */
    let head: Token | undefined

    /**
     * Tail token.
     *
     * @const {Token | undefined} tail
     */
    let tail: Token | undefined

    for (const [event, token] of events) {
      if (event === ev.enter) {
        if (head) {
          ok(tail, 'expected tail token')
          token.previous = tail
          tail.next = token
          tail = tail.next
        } else {
          head = tail = token
        }
      }
    }
  }

  return events
}

export default resolveTokenList
